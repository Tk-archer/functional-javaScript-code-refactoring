// 章节一 1.1
const splat = fun => array => fun(...array)

const addArrayElements = splat((x, y) => x + y)
addArrayElements([1, 2])

const unslplat = fun => (...arg) => fun(Array.form(arg))

const joinElements = unslplat(array => array.join(''))

joinElements(1, 2)

joinElements('-', '$', '/', '!', ';')

/////////////
// 1.2.2

function parseAge(age) {
  if (!_.isString(age)) throw new Error('Expecting a string')

  console.log('Attemptin to parse an age')

  let a = parseInt(age, 10)

  if (_.isNaN(a)) {
    console.log(`Coule not parse age:${age}`)
    a = 0
  }

  return a
}

const fail = thing => {
  throw new Error(thing)
}

const warn = thing => console.log(`WARNING ${thing}`)

const note = thing => console.log(`NOTE ${thing}`)

const parseAgeN = age => {
  if (!_.isString(age)) fail('Expecting a string')

  note('Attemptin to parse an age')

  let a = parseInt(age, 10)

  if (_.isNaN(a)) {
    warn(`Coule not parse age:${age}`)
    a = 0
  }

  return a
}
// 1.2.4

const naiveNth = (a, index) => a[index]

const isIndexed = data => _.isArray(data) || _.isString(data)

const nth = (a, index) => {
  if (!_.isNumber(index)) fail('Expected a number as the index')
  if (!isIndexed(a)) fail('Note supported on non-indexed type')
  if (index < 0 || index > a.length - 1) fail('Index value is out of bounds')

  return a[index]
}

const second = a => nth(a, 1)

const compareLessThanOrEqual = (x, y) => {
  if (x < y) return -1
  if (x > y) return 1
  return 0
}

// 1.2.5

const lameCSV = str =>
  _.reduce(
    str.split('\n'),
    (table, row) => {
      const rows = row.split(',').map(c => c.trim())
      table.push(rows)
      return table
    },
    []
  )

const rest = ([one, ...ary]) => ary

const selectNames = table => rest(table.map(_.first))

const selectAges = table => rest(table.map(second))

const selectHairColor = table => rest(table.map(row => nth(row, 2)))

// 1.2.6

const existy = x => x != null
const truthy = x => x !== false

const doWhen = (cond, action) => (truthy(cond) ? action() : undefined)

const executeIfHasField = (target, name) =>
  doWhen(existy(target[name]), () => {
    const result = _.reslut(target, name)
    console.log(`The result is ,${result}`)
    return result
  })


