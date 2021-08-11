<template>
    
    <keep-alive>
        <v-dialog v-model="dialog" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
            <component :is="currentComponent" @closed="setDialogStatus"></component> 
        </v-dialog>
    </keep-alive>
    <!-- is untuk component dynamic, bisa langsung tulis logiin/komponen lainnya. tapi kerena kita mau bikin dynamic maka pake yg currentComponent sesuai yang kita buat di alert.js -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {

    components : {
        Login : () => import('./Login.vue'),
        Register : () => import('./Register.vue')
    },

    computed : {
        ...mapGetters({
            dialogStatus        : 'dialog/status',
            currentComponent    : 'dialog/component',
        }),

        dialog : {
                    get () {
                        return this.dialogStatus
                    },
                    set (value) {
                        this.setDialogStatus(value)
                    }
                 }
    },

    methods : {
        ...mapActions({
            setDialogStatus     : 'dialog/setStatus',
        }),
    }
}
</script>
