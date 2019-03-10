const sessionControl = (function(){
   return {
      startNewSession: function(user) {
         console.log(`A new session has been started for ${user.name}`);
         window.location.href = 'session.html';
      }
   }
})()