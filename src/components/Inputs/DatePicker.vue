<template>
    <v-menu
            :close-on-content-click="false"
            lazy
            full-width
            min-width="290px">
        <v-text-field
                slot="activator"
                :value="dateFormatted"
                :label="$t('label.data_nascimento')"
                readonly></v-text-field>

        <v-date-picker v-model="value"
                       :locale="locale"
                       class="date-picker"
                       color="primary"
                       :show-current="value"
                       :max="getMinAge()"></v-date-picker>
    </v-menu>
</template>

<script>
import moment from 'moment';
import locale from '@/plugins/vuetify';

export default {
  name: 'DatePicker',
  props: {
    value: {
      default: '',
    },
    minAge: {
      default: null,
    },
  },
  data() {
    return {
      dateFormatted: '',
      locale,
    };
  },
  methods: {
    formatDate(data) {
      if (!data || data.length <= 0) {
        return '';
      }
      const dataMoment = moment(data);

      return dataMoment.format('DD MMMM YYYY');
    },
    getMinAge() {
      return this.minAge ? moment()
        .subtract(this.minAge, 'years')
        .toISOString() : null;
    },
    updateDateFormatted() {
      this.dateFormatted = this.formatDate(this.value);
    },
  },
  created() {
    this.updateDateFormatted();
  },
  watch: {
    value() {
      this.updateDateFormatted();
    },
  },
};
</script>
