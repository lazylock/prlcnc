export default {
  sfm: {
    //TODO: Restructure data
    mill: {
      plastic: 500,
      aluminum: 300,
      brass: 200,
      mildSteel: 100,
      stainlessSteel: 50,
    },
    drill: {
      plastic: 150,
      aluminum: 100,
      brass: 75,
      mildSteel: 30,
      stainlessSteel: 15,
    },
    face_mill: {
      aluminum: 1200,
      brass: 800,
      mildSteel: 600,
      stainlessSteel: 400,
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
