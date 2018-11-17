// 4.1

const finder = (valueFun, bestFun, coll) =>
  _.reduce(coll, (best, current) => {
    const bestValue = valueFun(best)
    const currentValue = valueFun(current)
    return bestValue === bestFun(bestValue, currentValue) ? best : current
  })

const best = (fun, coll) => _.reduce(coll, (x, y) => (fun(x, y) ? x : y))

// best((x, y)=> x>y, [1,2,3,4,5])

//4.1.2

const repeat = (times, VALUE) => _.map(_.range(times), () => VALUE)
// 等价于
// const repeat = (times, VALUE) => Array.from({ length: times }).fill(VALUE)

const repeatedly = (times, fun) => _.map(_.range(times), fun)
// eq
// const repeatedly = (times, fun) => Array.from({length:tiems}, fun)

const iterateUntil = (fun, check, init) => {
  const ret = []
  const result = fun(init)

  while (check(result)) {
    ret.push(result)
    result = fun(result)
  }

  return ret
}

// 4.2

const always = VALUE => () => VALUE

const invoker = (NAME, METHOD) => (target, ...args) => {
  if (!existy(target)) fail('Must provide a target')
  const targetMethod = target[NAME]

  return doWhen(existy(targetMethod) && METHOD === targetMethod, () =>
    targetMethod.apply(target, args)
  )
}

const uniqueSting = len =>
  Math.random()
    .toString(36)
    .substr(2, len)

const uniqueSting = prefix => `${prefix} ${new Date().getTime()}`

const makeUniqueStingFUnction = start => {
  const COUNTER = start
  return prefix => `${prefix}-${COUNTER}`
}

const fnull = (fun, ...defaults) => (...args) =>
  fun(..._.map(args, (e, i) => (existy(e) ? e : defaults[i])))

const defaults = d => (o, k) => {
  const val = fnull(_.identity, d[k])
  return o && val(o[k])
}

const doSomething = config => {
  const lookup = defaults({ critical: 108 })
  return lookup(config, 'critical')
}

// 4.3
// 这个地方实现用到了 chain ，但是 chain 其实并不是一个好的实践
// 因此我用原生的数组展开替代，结果是等价的
const checker = (...validators) => obj =>
  _.reduce(validators, (errs, check) =>
    check(obj) ? errs : [...errs, check.message])

const validator = (message, fun) => {
  const f = (...args) => fun.apply(fun, args)
  f['message'] = message
  return f
}

const hasKeys = (...keys) => {
  const fun = obj => _.every(keys, k => _.has(obj, k))

  fun.message = `Must have values for keys: ${keys.join(' ')}`
  return fun
}
