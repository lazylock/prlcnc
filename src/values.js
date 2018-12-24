export default {
  sfm: {
    mill: {
      hss: {
        plastic: 300,
        aluminum: 600,
        brass: 175,
        mild_steel: 70,
        stainless_steel: 80,
      },
      carbide: {
        plastic: 500,
        aluminum: 800,
        brass: 175,
        mild_steel: 350,
        stainless_steel: 300,
      },
    },
    drill: {
      plastic: 240,
      aluminum: 300,
      brass: 120,
      mild_steel: 90,
      stainless_steel: 50,
    },
    countersink: {
      plastic: 160,
      aluminum: 200,
      brass: 90,
      mild_steel: 60,
      stainless_steel: 35,
    },
    reamer: {
      plastic: 120,
      aluminum: 150,
      brass: 66,
      mild_steel: 45,
      stainless_steel: 25,
    },
    tap: {
      plastic: 100,
      aluminum: 100,
      brass: 100,
      mild_steel: 35,
      stainless_steel: 35,
    },
    face_mill: {
      plastic: 800,
      aluminum: 1200,
      brass: 800,
      mild_steel: 600,
      stainless_steel: 400,
    },
  },

  chipLoad: {
    plastic: [0.001, 0.003, 0.006, 0.008, 0.009],
    aluminum: [0.002, 0.002, 0.005, 0.006, 0.007],
    brass: [0.001, 0.002, 0.002, 0.004, 0.005],
    mild_steel: [0.0005, 0.0005, 0.001, 0.002, 0.003],
    stainless_steel: [0.005, 0.001, 0.002, 0.003, 0.004],
  },
}
