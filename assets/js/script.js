const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzqJkelWKyJVKPzXQrvaZBXfF_oBeWIE_5LYHsqcQB6ldAp6CUjwXYpzyP-Bm9VG5gp/exec"

    let userName = "";
    let consentChoice = "";

    // Function to handle both "ยินยอม" and "ไม่ยินยอม"
    function submitForm(userConsent) {

      consentChoice = userConsent;
      
      // Validate required fields only if ยินยอม
      if (userConsent === "ยินยอม") {
        const name = document.getElementById('name').value.trim();
        const gender = document.getElementById('gender').value.trim();
        const age = document.getElementById('age').value.trim();
        const tel = document.getElementById('tel').value.trim();
      }

      // Show scoring modal
      const scoringModal = new bootstrap.Modal(document.getElementById('scoringModal'));
      scoringModal.show();
    }

    // Handle form submit (Submit button)
    function handleSubmit(event) {
      event.preventDefault();
      submitForm("ยินยอม");
    }

    // Handle score selection (just close modal for now)
    function submitScore(score) {
      const name = document.getElementById('name').value.trim();
      const gender = document.getElementById('gender').value.trim();
      const age = document.getElementById('age').value.trim();
      const tel = document.getElementById('tel').value.trim();

      const payload = {
        name: name,
        gender: gender,
        age: age,
        tel: tel,
        consent: consentChoice,
        score: score
      };

      fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      })
      // .then(response_obj => response_obj.json())        // Wait response + parse JSON
      .then(() => {                                     // Use the JSON data for showing on Promotion Modal
        // Close scoring modal
        const scoringModal = bootstrap.Modal.getInstance(document.getElementById('scoringModal'));
        scoringModal.hide();
        

        const promoMessage = name ? `ขอบคุณ คุณ<b>${name}</b> ที่ร่วมกิจกรรม! 🎉` : `ขอบคุณที่ร่วมกิจกรรม! 🎉`;
        
        // Write the Promotion Message
        document.getElementById('promoMessage').innerHTML = promoMessage;
        
        // Show Promotion modal
        const promoModal = new bootstrap.Modal(document.getElementById('promoModal'));
        promoModal.show();
        

        document.getElementById('consentForm').reset();
      })
      .catch(err => {
        console.log("Error sending data: ", err);
        alert('Error Sending Data')
      }); 
    }