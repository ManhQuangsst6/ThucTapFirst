import { defineStore } from 'pinia'
export const component = defineStore('component', {
    state: () => {
        return {
            componentData: {
            },
        }
    },
    getters: {
        getComponent: state => state.componentData,
    },
    actions: {
        setComponent(data) {
            this.$state.componentData = data;
        },
        setField(obj){
            this.$state.componentData[obj.index].componentProps =  obj.data; 
        },
    },
})
