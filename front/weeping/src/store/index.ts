import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import createPersistedState from './plugins/persist'
import ApplicationModule, {IAppState} from './modules/app'

Vue.use(Vuex);
export interface IRootState {
    app:IAppState
}

export class EStore<S> extends Vuex.Store<S> {
    constructor(options: StoreOptions<S>){
        super(options)
    }
    public $vue?:Vue;
}

const store = new EStore<IRootState>({plugins:[createPersistedState()]});

 export default store;