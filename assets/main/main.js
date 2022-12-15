$(function () {


    // PROD
    const BASE_URL = "api"

    setTimeout(function(){
        if (localStorage.getItem('language') == "pt" || localStorage.getItem('language') == null) {
            $('#telefone').mask("(99) 9 9999-9999")
            $("#orcamento").maskMoney({ prefix: 'R$ ', allowNegative: false, thousands: '.', decimal: ',', affixesStay: false });
        } else {
            $('#telefone').mask("(999) 999-9999")
            $("#orcamento").maskMoney({ prefix: 'USD ', allowNegative: false, thousands: '.', decimal: ',', affixesStay: false });
        }
    } , 3000)

    $('#submit').on('click', function (event) {
        event.preventDefault();
    });

    //main variable
    var modalID;

    //Triggering a modal
    $('.modal-trigger').on("click", function () {

        var nome = $('#nome').val()
        var email = $('#email').val()
        var telefone = $('#telefone').val()
        var projeto = $('#projeto').val()
        var orcamento = $('#orcamento').val()

        if (nome && email && telefone && projeto && orcamento) {

            if (!isValidEmailAddress(email)) {
                var alertMessage
                if (localStorage.getItem('language') == "pt") {
                    alertMessage = 'O email que você informou não é valido!'
                } else {
                    alertMessage = 'Invalid email!'
                }

                alert(alertMessage);
                return;
            }

            $.ajax({
                url: BASE_URL + "mail/formBudget",
                type: "POST",
                data: JSON.stringify({
                    'nome': nome,
                    'email': email,
                    'telefone': telefone,
                    'projeto': projeto,
                    'orcamento': orcamento,
                    'language': localStorage.getItem('language'),
                    'country': localStorage.getItem('country'),
                    'region': localStorage.getItem('region')
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log('Enviado com sucesso');
                },
                error: function (error) {
                    console.log(error);
                }
            });

            gtag_report_conversion()

            $('#nome').val('')
            $('#email').val('')
            $('#telefone').val('')
            $('#projeto').val('')
            $('#orcamento').val('')

            modalID = $(this).attr('data-modal');
            $('#' + modalID).toggleClass('is-active');
            $('#' + modalID + ' .modal-background').toggleClass('scaleInCircle');
            $('#' + modalID + ' .modal-content').toggleClass('scaleIn');
            $('#' + modalID + ' .modal-close').toggleClass('is-hidden');
            //Prevent sticky fixed nav and backtotop from overlapping modal
            $('#scrollnav, #backtotop').toggleClass('is-hidden');
            //Prevent body from scrolling when scrolling inside modal
            setTimeout(function () {
                if ($('.dashboard-wrapper').length) {
                    $('body').addClass('is-fixed');
                }
            }, 700);
        } else {
            var alertMessage
            if (localStorage.getItem('language') == "pt") {
                alertMessage = "Preencha todos os campos corretamente."
            } else {
                alertMessage = "Fill all fields correctly"
            }

            alert(alertMessage);
        }

    });

    //Closing a modal
    $('.modal-close, .modal-dismiss').on("click", function () {
        $('#' + modalID + ' .modal-background').toggleClass('scaleInCircle');
        $('#' + modalID + ' .modal-content').toggleClass('scaleIn');
        $('#' + modalID + ' .modal-close').toggleClass('is-hidden');
        //Restore native body scroll
        if ($('.dashboard-wrapper').length) {
            $('body').removeClass('is-fixed');
        }
        setTimeout(function () {
            $('.modal.is-active').removeClass('is-active');
            //Restore sticky nav and backktotop
            $('#scrollnav, #backtotop').toggleClass('is-hidden');

        }, 500);
    });

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    var title = []

    var titlePT = ["Desenvolvimento de Aplicativos. ^2000", "Desenvolvimento de Painéis Administrativos.", "Desenvolvimento de Sites.", "Desenvolvimento de Sistemas.", "Desenvolvimento de Aplicativos."]

    var titleEN = ["Mobile Development. ^2000", "Dashboard Development.", "Website Development.", "Software Development.", "Landing Page Development.", "Mobile Development."]

    if (localStorage.getItem('language') == "en") {
        title = titleEN
    } else {
        title = titlePT
    }

    new Typed('#title', {
        typeSpeed: 50,
        startDelay: 1000,
        backSpeed: 50,
        strings: title
    });

})

