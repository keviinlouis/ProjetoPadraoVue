<template>
    <v-layout row wrap>
        <v-flex md2 pr-2>
            <v-text-field color="usuarioEstabelecimento"
                          name="cep"
                          v-model="value.cep"
                          :disabled="disabled"
                          v-on:keyup="debounceSearchCep()"
                          mask="#####-###"
                          v-validate="'required|min:8|validCep'"
                          :error-messages="errors.first('cep')"
                          :label="$t('label.cep')">
            </v-text-field>
        </v-flex>
        <v-flex md2 pr-2>
            <v-text-field color="usuarioEstabelecimento"
                          name="numero"
                          v-on:keyup="debounceSearchLatLong()"
                          v-model="value.numero"
                          :disabled="disabled"
                          v-validate="'required|min:1'"
                          :error-messages="errors.first('numero')"
                          :label="$t('label.numero')">
            </v-text-field>
        </v-flex>
        <v-flex md4 pr-2>
            <v-select
                    :items="estados"
                    v-model="value.estado"
                    :disabled="disabled"
                    :label="$t('label.estado')"
                    name="estado"
                    item-text="nome"
                    item-value="sigla"
                    v-validate="'required'"
                    :error-messages="errors.first('estado')"
            ></v-select>
        </v-flex>
        <v-flex md4 pr-2>
            <v-autocomplete
                    :items="cidades"
                    v-model="value.cidade"
                    :disabled="disabled"
                    :label="$t('label.cidade')"
                    name="cidades"
                    item-text="text"
                    item-value="text"
                    v-validate="'required'"
                    :no-data-text="$t('select.selecione_um_estado')"
                    :error-messages="errors.first('cidade')"
            ></v-autocomplete>
        </v-flex>
        <v-flex md4 pr-2>
            <v-text-field color="usuarioEstabelecimento"
                          name="rua"
                          v-model="value.rua"
                          :disabled="disabled"
                          v-validate="'required'"
                          :error-messages="errors.first('rua')"
                          :label="$t('label.rua')">
            </v-text-field>
        </v-flex>

        <v-flex md4 pr-2>
            <v-text-field color="usuarioEstabelecimento"
                          name="complemento"
                          v-model="value.complemento"
                          :disabled="disabled"
                          :label="$t('label.complemento')">
            </v-text-field>
        </v-flex>
        <v-flex md4 pr-2>
            <v-text-field color="usuarioEstabelecimento"
                          name="bairro"
                          v-model="value.bairro"
                          :disabled="disabled"
                          v-validate="'required'"
                          :error-messages="errors.first('bairro')"
                          :label="$t('label.bairro')">
            </v-text-field>
        </v-flex>
    </v-layout>
</template>

<script>
import _ from 'lodash';
import estadosCidades from '@/assets/estados-cidades.json';

export default {
  name: 'EnderecoSection',
  props: {
    value: {
      default: () => ({
        cep: '',
        numero: '',
        rua: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      }),
    },
    disabled: {
      default: false,
    },
  },
  inject: {
    $validator: '$validator',
  },
  computed: {
    estados: () => {
      const estados = estadosCidades.estados;
      estados.splice(0, 1);
      return estados;
    },
  },
  data() {
    return {
      cidades: [],
      debounceSearchCep: _.debounce(this.searchCep, 300),
      debounceSearchLatLong: _.debounce(this.searchLatLong, 500),
    };
  },
  methods: {
    carregaCidades(estadoSigla) {
      const estado = this.estados.find(x => x.sigla === estadoSigla);
      if (!estado) {
        return;
      }
      this.cidades = estado.cidades.map(x => ({ text: x }));
    },
    async searchCep() {
      this.$emit('setLoading', true);

      const response = await this.$store.dispatch('getCep', this.value.cep);

      this.$emit('setLoading', false);

      if (response.erro || response === false) {
        return false;
      }

      this.$emit('input', {
        cep: response.cep,
        rua: response.logradouro,
        bairro: response.bairro,
        complemento: response.complemento,
        cidade: response.localidade,
        estado: response.uf,
        numero: null,
      });
    },
    async searchLatLong() {
      if (this.value.numero == null) {
        return false;
      }
    },
  },
  created() {
    if (this.value.estado && this.value.estado.length > 0) {
      this.carregaCidades(this.value.estado);
    }
  },
  watch: {
    'value.estado': function (value, oldValue) {
      this.carregaCidades(value);
    },
  },
};
</script>

<style scoped>

</style>
