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
        // {days:['L', 'X', 'V'],durations:[90, 45, 105],times:['09:00', '11:15', '15:00']}
        decode (input) {

            // Step 1: Add quotes around keys
            let fixedStr = input.replace(/([a-zA-Z_]+):/g, '"$1":');

            // Step 2: Replace single-quoted strings with double-quoted strings
            fixedStr = fixedStr.replace(/'([^']*)'/g, '"$1"');

            if (fixedStr == null || fixedStr == '') return 0;

            const schedule = JSON.parse(fixedStr);

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

        formatArray(array) {
            if (array == 0) return 'Horario no definido.';
            let output = ''
            for (item of array) {
                output += `<p><strong>${item[0]}</strong>, de ${item[1]} a ${item[2]}</p>`;
            }
            return output;
        },

        // [['Lunes', '09:00', '10:30'],['Miércoles', '11:15', '12:00']]
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
                    'times': times,
                    'durations': durations};
        },
    },
    
    relMgr: {
    async testIsActiveStudent(id_alumno) {
        const nonce = Date.now() + '-' + Math.random();
        console.log('=== Inicio Debug testIsActiveStudent ===');
        console.log('Verificando alumno ID:', id_alumno);
        
        const url = `./resources/relaciones/testActiveStudent.php?q=${encodeURIComponent(id_alumno)}&nonce=${nonce}`;
        console.log('URL de la petición:', url);

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('Respuesta PHP:', data);
            return !!data.activo;
        } catch (e) {
            console.error('Error comprobando relación activa', e);
            return false;
        }
    },

    async endFriendRelationship(id_relacion) {
    try {
        const response = await fetch(`./resources/relaciones/setExpiredFriendship.php?q=${encodeURIComponent(id_relacion)}`);
        const data = await response.json();

        if (data.success) {
            _ex.ui.toast.make('Relación finalizada correctamente', 'Ok', false);
            

            const row = document.querySelector(`tr[data-idrelacion="${id_relacion}"]`);
            if (row) {
                const estadoCell = row.querySelector('td:nth-child(4)'); 
                if (estadoCell) {
                    estadoCell.textContent = 'Inactivo';
                }
            }
        } else {
            _ex.ui.toast.make('Error al finalizar relación: ' + (data.message || 'Error desconocido'));
        }
    } catch {
        _ex.ui.toast.make('Error de red al finalizar relación');
    }
},

    async testIsActiveStudentPrompt(id_alumno) {
        const active = await this.testIsActiveStudent(id_alumno);
        _ex.ui.toast.make(
            active ? 'La relación está activa.' : 'La relación no está activa.',
            'Ok',
            !active
        );
    },

    async testIsActiveStudentPromptFromRelacion(buttonEl) {
        const id = buttonEl.dataset.idalumno1;
        
        try {
            const isActive = await this.testIsActiveStudent(id);
            _ex.ui.toast.make(
                isActive ? 'La relación está activa.' : 'La relación no está activa.',
                'Ok',
                !isActive
            );
        } catch {
            _ex.ui.toast.make('Error al comprobar el estado de la relación.', 'Cerrar');
        }
    },

    async isRelationshipActive(id_alumno1, id_alumno2) {
        try {
            const active = await this.testIsActiveStudent(id_alumno1);
            return active;
        } catch (e) {
            console.error('Error comprobando relación activa', e);
            return false;
        }
    },

    endFriendRelationshipConfirm(id_relacion) {
        if (_ex?.ui?.dialog?.make) {
            _ex.ui.dialog.make(
                '¿Seguro que quieres finalizar esta relación?',
                '',
                () => this.endFriendRelationship(id_relacion),
                'Finalizar',
                true,
                'Cancelar'
            );
        } else {
            if (confirm('¿Seguro que quieres finalizar esta relación?')) {
                this.endFriendRelationship(id_relacion);
            }
        }
    }
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
                const dialog = document.getElementById('dialogBox');
                if (dialog) {
            dialog.remove();
                    }
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

window.relMgr = _ex.relMgr;

