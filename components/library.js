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
    }
}