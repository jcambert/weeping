import Vue, { VNode } from 'vue'
import {ISpidService} from '@/services/spid'
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
   
  }
  interface String {
    formatUnicorn(...arg:any) : string;
    capitalize():string;
  }

  interface Window{
    getApp:Vue,
    spid:ISpidService
  }
  interface Document{
    mozCancelFullScreen?():void;
    webkitExitFullscreen?():void;
    msExitFullscreen?():void;
    mozFullScreenElement?():void;
    webkitFullscreenElement?():void;
    msFullscreenElement?():void;
  }
  interface HTMLElement {
    requestFullScreen?(): void;
    mozRequestFullScreen?():void;
    webkitRequestFullScreen?():void;
    msRequestFullscreen?():void;
    

  }

}
