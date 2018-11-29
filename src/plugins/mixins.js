import Vue from 'vue';

const mixins = {
  methods: {
    handleResponse(response, scope, onSuccess) {
      if (response.isSuccess()) {
        onSuccess();
        return response;
      }

      if (!response.isBadRequest() || !this.form) {
        return response;
      }

      Object.keys(this.form)
        .forEach((key) => {
          if (response.hasInput(key)) {
            const message = response.getValidatorInput(key);
            this.$validator.errors.add({
              field: key,
              scope,
              msg: message,
            });
          }
        });

      return response;
    },
  },
};

Vue.mixin(mixins);
