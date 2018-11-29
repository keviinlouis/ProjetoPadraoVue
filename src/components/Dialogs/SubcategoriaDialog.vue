<template>
    <v-dialog :value="value" @keydown.esc="close" max-width="500">
        <v-card>
            <v-card-title>
                <span class="headline">Definir Item</span>
            </v-card-title>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex md5 pa-2>
                        <v-autocomplete
                                v-model="subcategoria.categoria_id"
                                :items="categorias.map(function(item){ return {text: item.nome, value: item.id}})"
                                color="primary"
                                outline
                                name="categoria"
                                label="Categoria"
                                v-validate="'required'"
                                :error-messages="errors.first('categoria')"
                        />
                    </v-flex>
                    <v-flex md7 pa-2>
                        <v-text-field name="nome"
                                      outline
                                      color="primary"
                                      :label="$t('label.nome')"
                                      v-model="subcategoria.nome"
                                      v-validate="'required|min:3'"
                                      :error-messages="errors.first('nome')"
                                      @keyup.enter="sendForm"
                                      type="text">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap justify-end>
                    <v-flex md4 pa-2>
                        <v-btn color="grey darken-1"
                               @click="close"
                               class="font-weight-bold"
                               dark
                               block
                               depressed>
                            {{$t('btn.cancelar')}}
                        </v-btn>
                    </v-flex>
                    <v-flex md4 pa-2>
                        <v-btn color="primary"
                               @click="sendForm"
                               class="font-weight-bold"
                               :loading="loading"
                               block
                               depressed>
                            {{$t('btn.enviar')}}
                        </v-btn>

                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'SubcategoriaDialog',
    props: {
      value: {
        type: Boolean,
      },
      subcategoria: {
        default: {
          id: 0,
          categoria_id: 0,
          nome: '',
        },
      },
    },
    computed: {
      ...mapGetters({
        categorias: 'categorias/getCategorias',
      }),
    },

    data() {
      return {
        loading: false,
      };
    },
    created(){
      this.$validator.reset();
    },
    methods: {
      close() {
        this.$emit('input', false);
      },
      async sendForm() {
        this.loading = await this.$validator.validateAll();

        if(!this.loading){
          return;
        }

        const response = await this.handleResponse(
          await this.$store.dispatch('categorias/sendSubcategoria', this.subcategoria),
          '',
          () => this.close()
        );

        console.log(response);

        this.loading = false;

        if(response.isSuccess()){
          const text = this.subcategoria.id === 0 ? 'Subcategoria criada com sucesso' : 'Subcategoria editada com sucesso';

          this.$store.dispatch('setToast', {text});

          this.$store.dispatch('categorias/loadCategorias');
        }
      },
    },
  };
</script>

<style scoped>

</style>
