function EtchRouterError(message){
  this.name = 'Etch Router Error'
  this.message = message || 'Etch Router has hit a problem.'
  this.stack = (new Error()).stack
}

EtchRouterError.prototype = Object.create(Error.prototype)
EtchRouterError.prototype.constructor = EtchRouterError

module.exports = EtchRouterError
