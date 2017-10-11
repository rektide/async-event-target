# Async EventTarget

Async EventTarget is a experimental library exploring making event handling asynchronous.

It attaches an `alsoAwait` method to events being fired, which event handlers can use to submit promises.

Once all promises so submitted during event handling resolve, a promise for the dispatching event is fired.

# Why?

Originally it was looking at Webpack's synchronous event-based build pipeline that got me thinking about this.

I wanted a more general way to build compiler or build pipelines, which are frequently a bunch of named events, and this came out as it's own piece of that puzzle.
