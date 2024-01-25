import * as chai from 'chai';
import * as chaiThings from 'chai-things'
chai.use(chaiThings)
chai.should()

import bt from '../src/TicketContainer'
import { interpretFieldResult } from '../src/utils';

describe('block-types.js', () => {
  it('should return an array', () => {
    bt.should.be.an('array')
  })
  it('should only return objects inside the array with a property of name', () => {
    bt.should.all.have.property('name')
  })
  it('should only return objects inside the array with a property of versions', () => {
    bt.should.all.have.property('versions')
  })
  describe('Generic Types', () => {
    describe('STRING', () => {
      it('should return an String from a Buffer', () => {
        // const dataTypeArr = bt[0].versions['01'][0]
        const dataTypeArr = bt.find(container => container.name=="U_HEAD" && container.version=="01")?.dataFields[0]
        const res = dataTypeArr?.interpreterFn
        const testValue = 'GAUF'
        res!(Buffer.from(testValue)).should.be.equal(testValue)
      })
    })
    describe('HEX', () => {
      it('should return a hexadecimal encoded string representation from a Buffer', () => {
        const dataTypeArr = bt.find(container => container.name=="U_HEAD" && container.version=="01")?.dataFields[2]
        const res = dataTypeArr?.interpreterFn
        const testValue = '0123456789abcdef'
        res!(Buffer.from(testValue, 'hex')).should.be.equal(testValue)
      })
    })
    describe('STR_INT', () => {
      it('should return a number from a Buffer encoded string', () => {
        const dataTypeArr = bt.find(container => container.name=="U_TLAY" && container.version=="01")?.dataFields[1]
        const res = dataTypeArr?.interpreterFn
        const testValue = 1234
        const testValueBuf = Buffer.from(testValue.toString(10))
        res!(testValueBuf).should.be.equal(testValue)
      })
    })
    describe('DB_DATETIME', () => {
      it('should return a Date from a Buffer encoded string', () => {
        const dataTypeArr = bt.find(container => container.name=="U_HEAD" && container.version=="01")?.dataFields[3]
        const res = dataTypeArr?.interpreterFn
        const str = '130419871215'
        const dummyDateBuf = Buffer.from(str)
        const dummyDate = new Date(1987, 3, 13, 12, 15)
        res!(dummyDateBuf).should.be.deep.equal(dummyDate)
      })
    })
  })
  describe('Special Types', () => {
    describe('EFS_DATA', () => {
      let res
      let res2
      let resDc10
      before((done) => {
        const fn = bt.find(container => container.name=="0080VU" && container.version=="01")?.dataFields[4].interpreterFn
        const testBuf = Buffer.from('130791f0187407d018763821000138221800000000130791f008dc060d18767a131c', 'hex')
        const testBufDc10 = Buffer.from('130791f0187407d018763821000138221800000000130791f008dc061018767a131c', 'hex')
        const doubleTestBuf = Buffer.from('130791f0187407d018763821000138221800000000130791f008dc060d18767a131c130791f0187407d018763821000138221800000000130791f008dc060d18767a131c', 'hex')
        res = fn!(testBuf)
        res2 = fn!(doubleTestBuf)
        resDc10 = fn!(testBufDc10)
        done()
      })
      it('should return an object', () => {
        res.should.be.an('object')
      })
      it('should have property of property of berechtigungs_nr', () => {
        res['1'].should.have.property('berechtigungs_nr', 319263216)
      })

      it('should also work with mutliple tickets', () => {
        res2['1'].should.have.property('berechtigungs_nr', 319263216)
      })
      it('should handle DC-typ 0x0d', () => {
        res['1'].should.have.nested.property('Liste_DC.typ_DC', '0d')
      })
      it('should handle DC-typ 0x10', () => {
        resDc10['1'].should.have.nested.property('Liste_DC.typ_DC', '10')
      })
      it('should parse the DateTime correctly', () => {
        res['1'].should.have.deep.property('valid_from', new Date(2018, 0, 1, 0, 0, 0)) // .and.be.instanceof(Date);
      })
    })
    describe('RCT2_TEST_DATA', () => {
      const fn = bt.find(container => container.name=="U_TLAY" && container.version=="01")?.dataFields[2].interpreterFn
      const RCT2_TEST_DATA = Buffer.from('303030303031373130303031384d617274696e61204d75737465726d616e6e3031303030313731303030313654616765735469636b657420506c757330323030303137313030303239507265697373747566652031302c2056474e20476573616d747261756d3033303030313731303030333332372e30352e323031372030303a30302d32392e30352e323031372030333a30303035303030313731303030313030312e30312e31393930', 'hex')
      const result = fn!(RCT2_TEST_DATA)
      it('should return an array', () => {
        result.should.be.an('array')
      })
      it('should return object as array items', () => {
        result.should.all.be.instanceof(Object)
      })
      it('should return objects inside array with specific properties', () => {
        result.should.all.have.property('line')
          .and.all.have.property('column')
          .and.all.have.property('height')
          .and.all.have.property('width')
          .and.all.have.property('style')
          .and.all.have.property('value')
      })
      it('should parse the content of properties correctly', () => {
        result[0].should.have.deep.property('line', 0)
        result[0].should.have.deep.property('column', 0)
        result[0].should.have.deep.property('height', 1)
        result[0].should.have.deep.property('width', 71)
        result[0].should.have.deep.property('style', 0)
        result[0].should.have.deep.property('value', 'Martina Mustermann')
      })
    })
    describe('auftraegeSblocks_V3', () => {
      const fn = bt.find(container => container.name=="0080BL" && container.version=="03")?.dataFields[1].interpreterFn
      const TEST_DATA = Buffer.from('313031303132303138303130313230313832373839343134353200313653303031303030395370617270726569735330303230303031325330303330303031415330303930303036312d312d3439533031323030303130533031343030303253325330313530303035526965736153303136303031344ec3bc726e626572672b4369747953303231303033304e562a4c2d4862662031353a343820494345313531332d494345313731335330323330303133446f656765204672616e6369735330323630303032313353303238303031334672616e63697323446f656765533033313030313030312e30312e32303138533033323030313030312e30312e32303138533033353030303531303239375330333630303033323834', 'hex')
      const result = fn!(TEST_DATA)
      it('should return an object', () => {
        result.should.be.an('object')
      })
      it('should return an object with correct properties', () => {
        result.should.have.deep.property('auftrag_count', 1)
        result.should.have.deep.property('sblock_amount', 16)
        result.should.have.deep.property('auftrag_1', {
          valid_from: '01012018',
          valid_to: '01012018',
          serial: '278941452\u0000'
        })
      })
      describe('auftraegeSblocks_V3.sblocks', () => {

        const fn = bt.find(container => container.name=="0080BL" && container.version=="03")?.dataFields[1].interpreterFn
        const TEST_DATA = Buffer.from('313031303132303138303130313230313832373839343134353200313653303031303030395370617270726569735330303230303031325330303330303031415330303930303036312d312d3439533031323030303130533031343030303253325330313530303035526965736153303136303031344ec3bc726e626572672b4369747953303231303033304e562a4c2d4862662031353a343820494345313531332d494345313731335330323330303133446f656765204672616e6369735330323630303032313353303238303031334672616e63697323446f656765533033313030313030312e30312e32303138533033323030313030312e30312e32303138533033353030303531303239375330333630303033323834', 'hex')
        const result = fn!(TEST_DATA) as interpretFieldResult 
        it('should return an object', () => {
          result.sblocks.should.be.a('object')
        })
      })
    })
    describe('auftraegeSblocks_V2', () => {
      const fn = bt.find(container => container.name=="0080BL" && container.version=="02")?.dataFields[1].interpreterFn
      const TEST_DATA = Buffer.from('3130313233343536373839213031323334353637383921303130343230313830313034323031383031303432303138313653303031303030395370617270726569735330303230303031325330303330303031415330303930303036312d312d3439533031323030303130533031343030303253325330313530303035526965736153303136303031344ec3bc726e626572672b4369747953303231303033304e562a4c2d4862662031353a343820494345313531332d494345313731335330323330303133446f656765204672616e6369735330323630303032313353303238303031334672616e63697323446f656765533033313030313030312e30312e32303138533033323030313030312e30312e32303138533033353030303531303239375330333630303033323834', 'hex')
      const result = fn!(TEST_DATA)
      it('should return an object', () => {
        result.should.be.an('object')
      })
      it('should return an object with correct properties', () => {
        result.should.have.deep.property('auftrag_count', 1)
        result.should.have.deep.property('sblock_amount', 16)
        result.should.have.deep.property('auftrag_1', {
          certificate: '0123456789!',
          padding: '3031323334353637383921',
          valid_from: '01042018',
          valid_to: '01042018',
          serial: '01042018'
        })
      })
    })
    describe('AUSWEIS_TYP', () => {
      const fn = bt.find(container => container.name=="0080ID" && container.version=="01")?.dataFields[0].interpreterFn
      const TEST_DATA = Buffer.from('09')
      const result = fn!(TEST_DATA)
      it('should return a string', () => {
        result.should.be.a('string')
      })
      it('should parse the value correctly', () => {
        result.should.be.equal('Personalausweis')
      })
    })
  })
})
