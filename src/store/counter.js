export default {
    namespaced : true,
    state: {
        count: 0
    },
    getters: {
        count : (state) => {
            return state.count
        }
    },
    mutations:{
        /* membuat mutasi increment dengan 2 param (state dan payload) dimana count nya akan mengincrement sebanyak payload nya */
        increment : (state , payload) => {
            state.count += payload
        }
    },
    actions: {
    
    }
}