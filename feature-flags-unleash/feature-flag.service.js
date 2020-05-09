const { initialize, destroy } = require('unleash-client');

/**
 * Feature Flag Service
 */

/**
 * @typedef Configuration
*/

/** 
  * @typedef Context
*/



/**
 *
 *
 * @param { Configuration } config
 * @returns
 */
module.exports = function FeatureFlag(  ) { 

   this.config = null
   this.context = { };
   this.instance = null;

   /**
    * Configure Public API of Function
    */
   const obj = {}

   /**
    * 
    */
   obj.init = ( config ) => { 

      if(this.instance) return obj.getInstace();
   
      // Update config about instance.
      if(config) { 
         Object.assign(this.config, config)
      }

      console.log('Starting Instance of FeatureFlag using unleash')
      this.instance =  initialize(this.config);
      
      this.instance.on('error', console.error);
      this.instance.on('warn', console.warn);
      this.instance.on('ready', console.log);

      if(this.config.debugger)
      {
         this.instance.on('registered', (clientData) => {
             console.log('registered', clientData)
         });
         
         this.instance.on('sent', (payload) => {
            console.log('metrics bucket/payload sent', payload)
         });

         this.instance.on('count', (name, enabled) => {
            console.log(`Feature Flag: ${name} returned ${enabled}`)
         });

      }
      return this;
   }
   
   obj.getInstace = () => { 
      return this.instance;
   }

   /**
    * @param { Context } Context
    * @return 
    */
   obj.setContext = (context) => { 
      if(!context) throw new Error('Sorry, but you need pass at a context configuration')
      this.context = context;
      return this;
   }

   obj.getContext = () => { 
      return this.context;
   }

   const _checkIsEnable = (flag) => { 
      return this.instance.isEnabled(flag, this.context)
   }

   obj.checkFlagsWithContext = (...args) => { 
      if(!this.instance) throw new Error("Sorry, but doesn't has Instance of Feature Flags")
      if(!this.context ) throw new Error("Sorry, but doesn't has a context")
      if(!args.length) throw new Error("Please, you need pass at least some flag")
      return !args.map( _checkIsEnable ).includes(false)
   }

   obj.checkFlagWithoutContext = (...args) => {
      if(!this.instance) throw new Error("Sorry, but doesn't has Instance of Feature Flags")
      if(!args.length) throw new Error("Please, you need pass at least some flag")
      return !args.map( _checkIsEnable ).includes(false)
   }

   obj.destroy = () => { 
      destroy();
      console.info("Instance of Feature Flag destroyed")
   }
 
   return obj
 }

