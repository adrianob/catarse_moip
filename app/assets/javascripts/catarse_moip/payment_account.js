CATARSE.PaymentAccount = CATARSE.UserDocument.extend({
  el: '#payment_type_account_section',

  events: {
    'change select#account' : 'onChangeAccount',
    'click input#build_account_link' : 'onBuildAccountClick',
    'keyup #user_document_account' : 'onUserDocumentKeyup'
  },

  initialize: function(options){
    this.moipForm = options.moipForm;
  },

  onChangeAccount: function(e){
    var value = $(e.currentTarget).val();
    this.$('input#build_account_link').attr('disabled', !(value != "" && value != undefined));
  },

  onBuildAccountClick: function(e) {
    var that = this;
    e.preventDefault();
    $(e.currentTarget).hide();
    that.moipForm.loader.show();

    // Get token and send payment
    that.moipForm.getMoipToken(function(){
      var settings = {
        "Instituicao": $('select#account').val(),
        "Forma": "DebitoBancario"
      }
      MoipWidget(settings);
    });
  }
});

