const _ex = {
    format: {
        date(date, showDays = true){
            if(showDays) return date.split(' ')[0].split('-').reverse().join('/'); 
            return date.split('-').reverse().slice(1).join('/');
        },

        dateTime(date, showSeconds = false){
            if(showSeconds) return date.split(' ')[0].split('-').reverse().join('/') + ' ' + date.split(' ')[1]
            return date.split(' ')[0].split('-').reverse().join('/') + ' ' + date.split(' ')[1].slice(0, 5);
        },

        iban(iban){
            return iban.replace(/(.{4})/g, '$1 ').trim();
        },

        money(cents) {
            return (parseInt(cents) / 100).toFixed(2) + '€';
        },

        phoneNum(number){
            if (/^\d{9}$/.test(number)) {
                number = number.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
            }
            return number;
        },
    },

    schedule: {
        decode (schedule) {
            // Decode day names
            const dayMap = {
                L: 'Lunes',
                M: 'Martes',
                X: 'Miércoles',
                J: 'Jueves',
                V: 'Viernes',
                S: 'Sábado',
                D: 'Domingo'
            };

            for (i in schedule.days){
                schedule.days[i] = dayMap[schedule.days[i]] || schedule.days[i];
            }

            // Decode durations into end times
            let endTimes = [];
            for (i in schedule.days){
                let hour = parseInt(schedule.times[i].split(':')[0]);
                let minute = parseInt(schedule.times[i].split(':')[1]);
                minute += parseInt(schedule.durations[i]);
                while(minute >= 60){
                    minute -= 60;
                    hour++;
                }
                const endHour = (hour).toString().padStart(2, '0');
                const endMinute = (minute).toString().padStart(2, '0');
                endTimes.push(`${endHour}:${endMinute}`);
            }

            // Organize data into output array
            let output = [];
            for (i in schedule.days){
                output.push([schedule.days[i], schedule.times[i], endTimes[i]]);
            }

            return output;
        },

        encode (array) {
            // Encode day names into single digits
            const dayMap = {
                Lunes: 'L',
                Martes: 'M',
                Miércoles: 'X',
                Jueves: 'J',
                Viernes: 'V',
                Sábado: 'S',
                Domingo: 'D'
            };

            let days = [];
            for (i in array){
                days[i] = dayMap[array[i][0]] || array[i][0];
            }

            // Create an array with the start times
            let times = [];
            for (i in array) {
                times.push(array[i][1]);
            }

            // Encode end times into durations
            let durations = [];
            for (i in array){
                let startHour = parseInt(array[i][1].split(':')[0]);
                let startMinute = parseInt(array[i][1].split(':')[1]);
                let endHour = parseInt(array[i][2].split(':')[0]);
                let endMinute = parseInt(array[i][2].split(':')[1]);

                let hours = endHour - startHour;
                let minutes = endMinute - startMinute;

                while(minutes < 0 || hours >= 1){
                    minutes += 60;
                    hours--;
                }

                durations.push(minutes);
            }

            return {'days': days,
                    'tiems': times,
                    'durations': durations};
        },
    },

    ui: {
        dialog: {
            make(title = 'Diálogo', text = 'Contenido', action = _ex.ui.dialog.dismiss, actionText = 'Aceptar', destructive = false, cancelText = 'Cancelar') {
                const scrim = document.createElement('div');
                scrim.id = 'dialogBox';

                const dialog = document.createElement('div');
                if (destructive) dialog.classList.add('destructive');

                const textdiv = document.createElement('div');
                textdiv.classList.add('textContainer')
                const titleText = document.createElement('h2');
                titleText.textContent = title;
                const textText = document.createElement('p');
                textText.textContent = text;

                const buttondiv = document.createElement('div');
                buttondiv.classList.add('buttonContainer')
                const closeButton = document.createElement('button');
                closeButton.textContent = cancelText;
                closeButton.onclick = function () { 
                    _ex.ui.dialog.dismiss();
                };

                const button = document.createElement('button');
                button.textContent = actionText;
                button.onclick = function () { 
                    action(); 
                    _ex.ui.dialog.dismiss();
                };

                textdiv.appendChild(titleText);
                textdiv.appendChild(textText);
                dialog.appendChild(textdiv);
                buttondiv.appendChild(closeButton);
                buttondiv.appendChild(button);
                dialog.appendChild(buttondiv);
                scrim.appendChild(dialog)
                document.body.appendChild(scrim);
            },

            makeNotice(title = 'Diálogo', text = 'Contenido'){
                const scrim = document.createElement('div');
                scrim.id = 'dialogBox';

                const dialog = document.createElement('div');

                const textdiv = document.createElement('div');
                textdiv.classList.add('textContainer')
                const titleText = document.createElement('h2');
                titleText.textContent = title;
                const textText = document.createElement('p');
                textText.textContent = text;

                const buttondiv = document.createElement('div');
                buttondiv.classList.add('buttonContainer')
                const button = document.createElement('button');
                button.textContent = 'Aceptar';
                button.onclick = function () { 
                    _ex.ui.dialog.dismiss();
                };

                textdiv.appendChild(titleText);
                textdiv.appendChild(textText);
                dialog.appendChild(textdiv);
                buttondiv.appendChild(button);
                dialog.appendChild(buttondiv);
                scrim.appendChild(dialog)
                document.body.appendChild(scrim);
            },

            dismiss() {
                document.getElementById('dialogBox').remove();
            }
        }, 

        toast: {
            timer: null,
            make(contentText = 'Aviso', buttonText = 'Ok', warn = true) {
                let test = document.getElementById('toastMessage');
                if (test) test.remove();
                clearTimeout(_ex.ui.toast.timer);

                const toast = document.createElement('div');
                toast.id = 'toastMessage';
                if (warn) toast.classList.add('warn');

                const text = document.createElement('span');
                text.textContent = contentText;

                const button = document.createElement('button');
                button.textContent = buttonText;
                button.onclick = function () { 
                    _ex.ui.toast.dismiss(); 
                    clearTimeout(_ex.ui.toast.timer); 
                };

                button.addEventListener('click', () => toast.remove());
                toast.appendChild(text);
                toast.appendChild(button);
                document.body.appendChild(toast);

                toast.style.bottom = '-4rem';

                setTimeout(_ex.ui.toast.pop, 10);
            },

            pop() {
                document.getElementById('toastMessage').style.bottom = '5rem';
                _ex.ui.toast.timer = setTimeout(_ex.ui.toast.dismiss, 5100);
            },

            dismiss() {
                document.getElementById('toastMessage').style.bottom = '-4rem';
                _ex.ui.toast.timer = setTimeout(_ex.ui.toast.delete, 150);
            },

            delete() {
                const toast = document.getElementById('toastMessage');
                if (toast) toast.remove();
            }
        }
    }
}

function removeDetailsModal() {
    if (storage.pendingEdits) {
        _ex.ui.toast.make('Tienes cambios sin guardar.')
    } else {
        document.getElementById('popUpModal').remove()
    }
}

const storage = {
    activeStudent: 0,
    pendingEdits: false,
    studentData: null,
}