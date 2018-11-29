<template>
    <div style="cursor: pointer" @click="openInputFile">
        <slot></slot>

        <input type="file"
               v-show="false"
               @change="onInputFileChange"
               ref="infoBox">
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'UploadFoto',
        methods: {
            openInputFile() {
                this.$refs.infoBox.click();
            },
            onInputFileChange(e) {
                const files = e.target.files;
                this.uploadTmp(files[0]);
            },

            async removeTmp(store, fileName) {
                await axios.post(`removeTmp/${fileName}`);
            },
            async uploadTmp(file) {
                this.$emit('setLoading', true);

                const formData = new FormData();

                formData.append('file', file);

                const response = await axios({
                    url: 'api/utils/uploadTmp',
                    baseURL: process.env.VUE_APP_URL_BASE,
                    method: 'post',
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                    data: formData,
                });

                this.$emit('setLoading', false);

                const data = response.getData();

                if (response.isSuccess()) {
                    this.$emit('uploaded', data);
                    return true;
                }

                return false;
            },
        },
    };
</script>

<style scoped>

</style>
