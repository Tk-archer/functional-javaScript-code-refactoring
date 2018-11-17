// 2.1

const lyricSegment = n => [
  `${n} bottles of beer on the wall`,
  `${n} bottles of beer`,
  'Take one down , pass it around',
  `${n > 1 ? n - 1 : 'No more'} bottles of beer on the wall`
]

const song = (start, end, lyricGen) =>
  _.reduce(_.range(start, end, -1), (acc, n) => [...acc, ...lyricGen(n)], [])

// 2.2

const doubleAll = array => array.map(n => n * 2)

const average = array => array.reduce(array, (a, b) => a + b, 0) / _.size(array)

const onlyEven = array => array.filter(n => n % 2 === 0)

// 2.2.2

const allOf = (...args) => _.reduceRight(args, (truth, f) => truth && f())

const anyOF = (...args) => _.reduceRight(args, (truth, f) => truth || f())

const T = () => true

const F = () => flase

const complement = pred => (...args) => !pred.apply(null, args)

const cat = (head, ...rest) => existy(head) ? [...head].concat(...rest) : []

const construst = (head, tail) => cat([head], Array.from(tail))

const mapcat = (fun, coll) => cat(..._.map(coll, fun))

mapcat(e => construst(e, [',']), [1, 2, 3])
// [1,',',2,',',3,',']

const butLast = coll => Array.from(coll).slice(0, -1)

const interpost = (inter, coll) =>
  butLast(mapcat(e => construst(e, [inter], coll)))

// 2.3
// 按照原文的话应该改写成
// const project = (table, keys) => _.map(table, obj => _.pick.apply(null, construct(obj, keys)))
// 实际上 construct 的作用是 table 和 keys 展开到一个一维数组当中，然后作为 pick 的参数传入，而如果我们用 lodash 的话，就完全没有这个必要...

const project = (table, keys) => _.map(table, obj => _.pick(obj, keys))

// 又或者直接利用 rest 展开
// const project = (table, keys) => _.map(table, obj => _.pick(obj, ...keys))

const rename = (obj, newNames) =>
  _.reduce(
    newNames,
    (o, nu, old) =>
      _.has(obj, old)
        ? {
            ...o,
            [nu]: obj[old]
          }
        : o,
    _.omit(obj, _.keys(newNames))
  )

const as = (table, newNames) => _.map(table, obj => rename(obj, newNames))

const restrict = (table, pred) =>
  _.reduce(
    table,
    (newTable, obj) =>
      truthy(pred(obj)) ? newTable : _.without(newTable, obj),
    table
  )
// 等价于  
// const restrict = (table, pred)=> _.pickBy(table, pred)

