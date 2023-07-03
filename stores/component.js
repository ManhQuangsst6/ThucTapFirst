import { defineStore } from 'pinia'
export const component = defineStore('component', {
    state: () => {
        return {
            componentData: {
            },
            componentRole: [],
        }
    },
    getters: {
        getComponent: state => state.componentData,
        getComponnetRole: state => state.componentRole,
    },
    actions: {
        setComponent(data) {
            this.$state.componentData = data;
        },
        setField(obj) {
            this.$state.componentData[obj.index].componentProps = obj.data;
        },
        setComponentRole(data) {
            this.$state.componentRole = data;
        }
    },
})
