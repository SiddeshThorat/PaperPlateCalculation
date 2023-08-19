import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


const objectMapper = {
  costPerKg: 'किलोग्रॅम प्रति खर्च',
  totalPlateKitiBannar: 'एकूण प्लेट किती आहे',
  onePieceCost: 'एक पीस खर्च',
  onePacketCost: 'एक पॅकेट खर्च',
  totalPacketsKitiBannar: 'एकूण पॅकेट किती bannar',
  totalRevenue: 'एकूण आय',
  totalProfit: 'एकूण नफा',
  totalMaalInKg: 'एकूण माल (kg)',
  totalMalachiCost: 'एकूण माल खर्च',
  bhadamajuriTotalMalaSathi: 'एकूण मला साठी भाडा मजूरी',
  lightBillTotalMalaSathi: 'एकूण मला साठी लाइट बिल',
  aandazExtraKharchaTotalMalaSathi: "एकूण मला साठी आंदाज अतिरिक्त खर्च",
  packetMadheKitiPieceTakhnar: "पॅकेटमध्ये किती पीस ताकणार?", 
  costPerKgWithOtherExpense: "इतर खर्च सहित प्रति किलोग्रॅमचा खर्च",
  plateSizeInInch: "प्लेटचा आकार इंचमध्ये",
  packetKitiLaViknar: "पॅकेट किती लावणार?",
  totalExpense: "एकूण खर्च"
}

const quantityPerInch = {
  7: 288,
  6: 400
};

function App() {

  const [inputObject, setInputObject] = useState({
    totalMaalInKg: 0,
    totalMalachiCost: 0,
    bhadamajuriTotalMalaSathi: 0,
    lightBillTotalMalaSathi: 0,
    aandazExtraKharchaTotalMalaSathi: 0,
    packetMadheKitiPieceTakhnar: 0,
    plateSizeInInch: 0,
    packetKitiLaViknar: 0   
  })

  const [outPutData, setOutputData] = useState({
    costPerKg: 0,
    costPerKgWithOtherExpense: 0,
    totalPlateKitiBannar: 0,
    onePieceCost: 0,
    onePacketCost: 0,
    totalPacketsKitiBannar: 0,
    totalRevenue: 0,
    totalProfit: 0,
    totalExpense: 0
  });

  const computeValues = () => {
   console.log('checking', inputObject) 
    const { totalMalachiCost, 
      bhadamajuriTotalMalaSathi, 
      lightBillTotalMalaSathi, 
      aandazExtraKharchaTotalMalaSathi, 
      plateSizeInInch,
      totalMaalInKg,
      packetMadheKitiPieceTakhnar,
      packetKitiLaViknar
    } = inputObject;

  const totalExpense = totalMalachiCost + bhadamajuriTotalMalaSathi + lightBillTotalMalaSathi + aandazExtraKharchaTotalMalaSathi;
  const totalPlateKitiBannar =  totalMaalInKg * quantityPerInch[plateSizeInInch]
  const onePieceCost = totalExpense / totalPlateKitiBannar
  const onePacketCost = onePieceCost * packetMadheKitiPieceTakhnar
  const totalPacketsKitiBannar =  totalPlateKitiBannar / packetMadheKitiPieceTakhnar
  const totalRevenue =  packetKitiLaViknar * totalPacketsKitiBannar;
  setOutputData({
    costPerKg: totalMalachiCost / inputObject.totalMaalInKg,
    costPerKgWithOtherExpense: totalExpense / inputObject.totalMaalInKg,
    totalPlateKitiBannar: totalPlateKitiBannar,
    onePieceCost,
    onePacketCost,
    totalPacketsKitiBannar,
    totalExpense,
    totalRevenue,
    totalProfit: totalRevenue - totalExpense
   })
  }

  const handleFieldChange = (event, key) => {
    setInputObject({ ...inputObject, [key]: Number(event.target.value || 0) })
  }

  return (
    <div className="App">
        <h1>Plate Price Calculation</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
          {
            Object.keys(inputObject).map(question => {
              return (
                <div style={{ display: "flex", height: '35px', justifyContent: "center", alignItems: "center"}} >
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '80%',backgroundColor: '#80808024', height: '100%'}}>
                    {objectMapper[question]}
                  </div>
                  <div style={{ width: "20%"}}>
                    <input key={question} onChange={(event) => handleFieldChange(event, question)} type={'number'} style={{ maxWidth: '50px'}}  />
                  </div>
                </div>
              )
            })
          }
          
        </div>
        <button onClick={computeValues} style={{ height: "30px", border: '2px solid' ,borderRadius: '20px', width: "50%", margin: "auto", }}>Calculate</button>
        <div>
          <table>
            {
              Object.keys(outPutData).map((key) => {
                return (
                <tr>
                  <td style={{ backgroundColor: '#80808024' }}>{objectMapper[key]}</td>
                  <td>{outPutData[key]}</td>
                </tr>
                )
              })
            }
            
          </table>
        </div>
    </div>
  );
}


// output
// cost per kg
// total plate banar
// 1 piece cha cost
// 1 pkt cha cost
// total pkts bannar
// total revenue generated
// total profit

// input
// total maal
// cost total maal
// bhada + majuri total mala sathi
// aandaz light bill kharcha total mala sathi
// aandaz extra kharcha total mala sathi
// packet madhe kiti piece takhnar

export default App;
