/*import {Store} from 'vuex'
import merge from 'deepmerge';
import * as shvl from 'shvl';


interface OptionPersistentStorage{
    arrayMerger?:any,
    subscriber?:any,
    filter?:any,
    setState?:any,
    reducer?:any,
    paths?:any
}
export default function(options?:OptionPersistentStorage, storage?:Storage, key?:string) {
    var options_:OptionPersistentStorage
    var storage_:Storage;
    options_ = options || {};
    storage_ = storage || (window && window.localStorage);
    key = key || 'vuex';

    function canWriteStorage(storage:Storage) {
        try {
            storage_.setItem('@@','1');
            storage_.removeItem('@@');
        return true;
        } catch (e) {}

        return false;
    }

    function getState(key:string, storage:Storage, value:any) {
        try {
        return (value = storage_.getItem(key)) && typeof value !== 'undefined'
            ? JSON.parse(value)
            : undefined;
        } catch (err) {}

        return undefined;
    }

    function filter() {
        return true;
    }

    function setState(key:string, state:any, storage:Storage) {
        return storage_.setItem(key, JSON.stringify(state));
    }

    function reducer(state:any, paths:any) {
        return paths.length === 0
        ? state
        : paths.reduce(function(substate:any, path:string) {
            var v=shvl.get(state, path)
            return shvl.set(substate, path, v);
            }, {});
    }

    function subscriber(store:Store<any>) {
        return function(handler:(mutation:any,state:any)=>any) {
        return store.subscribe(handler);
        };
    } 

    if (!canWriteStorage(storage_)) {
        throw new Error('Invalid storage instance given');
    }

    return function(store:Store<any>) {
        const savedState = shvl.get(options_, 'getState', getState)(key, storage);
        console.log(savedState);
        if(savedState){
            var merged =merge(store.state,savedState);
            
            store.replaceState(merge(store.state, savedState));
        }
        (options_.subscriber || subscriber)(store)(function(mutation:any, state:any) {
        if ((options_.filter || filter)(mutation)) {
            (options_.setState || setState)(
            key,
            (options_.reducer || reducer)(state, options_.paths || []),
            storage
            );
        }
        });
    };
};*/
