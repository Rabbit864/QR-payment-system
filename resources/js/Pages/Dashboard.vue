<template>
  <div class="container">
    <label>File</label>
    <input type="file" id="file" ref="file">
    <button @click="generate()">Сгенирировать</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: "",
    };
  },
  methods: {
    generate() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      axios.post( 'api/generateProducts',
        formData,
        {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
        ).then(response => {
            console.log(response.data);
        })
        .catch(function(){
            console.log('FAILURE!!');
        });
    },
  },
};
</script>

