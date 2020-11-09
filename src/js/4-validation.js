console.log('Carreguei o Validation');

function validateUsername(field) {

    if (emptyField(field)) {
        field.removeClass('is-valid');
        field.addClass('is-invalid');
        field.next(".invalid-feedback").show();
        field.next(".invalid-feedback").html("Por favor, insira um e-mail");
        return false;

    } else {
        field.removeClass('is-invalid');
        // field.addClass('is-valid');
        field.next(".invalid-feedback").hide();

    }

    if (!regexField(field, /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)) {
        field.removeClass('is-valid');
        field.addClass('is-invalid');
        field.next(".invalid-feedback").show();
        field.next(".invalid-feedback").html("E-mail inválido");
        return false;

    } else {
        field.removeClass('is-invalid');
        // field.addClass('is-valid');
        field.next(".invalid-feedback").hide();
        
    }

}

function validatePassword(field) {

    if (emptyField(field)) {
        field.addClass('is-invalid');
        field.next(".invalid-feedback").show();
        field.next(".invalid-feedback").html("Por favor, insira uma senha");
        return false;

    } else {
        field.removeClass('is-invalid');
        // field.addClass('is-valid');
        field.next(".invalid-feedback").hide();

    }

}
