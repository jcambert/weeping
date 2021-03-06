
//import ApplicationModule from '@/store/modules/app'
interface eventCallback{}
interface IApplicationEvent{
  name:string
  callback:eventCallback
}
export default [
    {
        name: 'APP_LOGIN_SUCCESS',
        callback: function (user:any) {
            window.getApp.snackbar = {
                show: true,
                color: 'green',
                text: "Vous etes loggé<br>Bonjour "+ user.licencie.prenom
            };
            setTimeout(() => {
                //ApplicationModule.setUser(user.licencie);
                //if(user.info)
                //    ApplicationModule.setUserInfo(user.info);

                window.getApp.$router.push({ path: 'dashboard' });
            }, 1000);
         
        }
      },
      {
        name:'APP_REQUEST_ERROR',
        callback:function(e:any){
          window.getApp.snackbar = {
                show: true,
                color: 'red',
                text: e.message
            };
        }
      },
      {
        name: 'APP_LOGOUT',
        callback: function (e:any) {
          window.getApp.snackbar = {
            show: true,
            color: 'green',
            text: 'Logout successfully.'
          };
          window.getApp.$router.replace({ path: '/login' });
        }
      },
      {
        name: 'APP_PAGE_LOADED',
        callback: function (e:any) {
        }
      },
      {
        name: 'APP_AUTH_FAILED',
        callback: function (e:any) {
          window.getApp.$router.push('/login');
          window.getApp.$message.error('Token has expired');
        }
      },
      {
        name: 'APP_BAD_REQUEST',
        // @error api response data
        callback: function (msg:any) {
          window.getApp.$message.error(msg);
        }
      },
      {
        name: 'APP_ACCESS_DENIED',
        // @error api response data
        callback: function (msg:any) {
          window.getApp.$message.error(msg);
          window.getApp.$router.push('/forbidden');
        }
      },
      {
        name: 'APP_RESOURCE_DELETED',
        // @error api response data
        callback: function (msg:any) {
          window.getApp.$message.success(msg);
        }
      },
      {
        name: 'APP_RESOURCE_UPDATED',
        // @error api response data
        callback: function (msg:any) {
          window.getApp.$message.success(msg);
        }
      },
      {
        name:'APP_DISCONNECTED',
        callback:function(){
          window.getApp.$store.dispatch('setMessage',{type:'error',message:"Vous etes déconnecté du serveur"})
          //window.getApp.$message.error("Vous etes déconnecté du serveur")
        }
      },
      {
        name:'APP_CONNECTED',
        callback:function(){
          window.getApp.$store.dispatch('setMessage',{type:'success',message:"Vous etes connecté au serveur"})
          //window.getApp.$message.error("Vous etes déconnecté du serveur")
        }
      },
      {
        name:'APP_CONNECT_ERROR',
        callback:function(err){
          window.getApp.$store.dispatch('setMessage',{type:'error',message:"Immpossible de connecter le server :"+ err.message})
        }
      }
    
]