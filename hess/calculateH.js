const firebaseConfig = {
    apiKey: "AIzaSyBtCEb7H01amJ6NM0EMqTQM6wLAWL7sZUE",
    authDomain: "login-praktikum-tpb.firebaseapp.com",
    databaseURL: "https://login-praktikum-tpb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "login-praktikum-tpb",
    storageBucket: "login-praktikum-tpb.firebasestorage.app",
    messagingSenderId: "142865773881",
    appId: "1:142865773881:web:0290faf49a0416dfdca4e8"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();
  
  function calculateHessLaw() {
    let deltaH1,deltaH2,deltaHTotal; 
  
    try {
      // Ambil nilai input dari pengguna
      const deltaH1 = parseFloat(document.getElementById('deltaH1').value);
      const deltaH2 = parseFloat(document.getElementById('deltaH2').value);
      var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")); 
      
      // Cek apakah input valid 
      if (isNaN(deltaH1) || isNaN(deltaH2)) {
        document.getElementById('resultH').textContent = "Harap masukkan nilai ΔH yang valid!";
        return;
      }
  
      // Menghitung total perubahan entalpi berdasarkan hukum Hess
      deltaHTotal = deltaH1 + deltaH2;
  
      // Menampilkan hasil perhitungan di elemen dengan id "result"
      document.getElementById('resultH').textContent = `ΔH Total = ${deltaHTotal} kJ/mol`;
    } catch (error) {
      console.error("Terjadi kesalahan saat menghitung Hukum Hess: ", error);
      document.getElementById('resultH').textContent = "Terjadi kesalahan. Coba lagi!";
      return; // Exit the function if there's an error
    }
  
    // buat JSONnya
    const hessData = {
      deltaH1: deltaH1,
      deltaH2: deltaH2,
      deltaHTotal: deltaHTotal,
      timestamp: Date.now()
    };
  
    if (loggedInUser) {
      
      const database_ref = firebase.database().ref();
      
      // Upload JSON 
      database_ref.child('users/' + loggedInUser.uid + '/hessLawSimulations').push(hessData)
      .then(() => {
        alert('Data uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading data:', error);
      });
    } else {
      alert("No user is logged in.");
    }
  }