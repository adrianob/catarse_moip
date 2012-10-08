CATARSE.PaymentAccount = Backbone.View.extend({
  el: '#payment_type_account_section',

  events: {
    'change select#account' : 'onChangeAccount',
    'click input#build_account_link' : 'onBuildAccountClick'
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
    that.moipForm.getMoipToken(function(){
      e.preventDefault();

      $(e.currentTarget).hide();
      $(e.currentTarget).show();

      $('.list_payment input').attr('disabled', true);

      var settings = {
        "Instituicao": $('select#account').val(),
        "Forma": "DebitoBancario"
      }
      MoipWidget(settings);
    });
  }
});

