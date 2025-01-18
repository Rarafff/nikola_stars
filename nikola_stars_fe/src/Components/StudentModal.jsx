import Swal from "sweetalert2";

function StudentProfileModal({ student, show }) {
  if (show && student) {
    let timerInterval;
    Swal.fire({
      title: `Hello, ${student.name}! 🌟`,
      html: `
        <div style="margin: 20px 0;">
          <h5>You have</h5>
          <h1 style="color: #FFD700; font-size: 48px; margin: 15px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
            ${student.stars} ⭐
          </h1>
        </div>
        <p style="margin-top: 15px;">This window will close soon</p>
      `,
      timer: 15000,
      timerProgressBar: true,
      background: "#fff3e0",
      backdrop: `
        rgba(255,230,255,0.95)
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l5.5 11.5L48 22l-11.5 5.5L30 39l-5.5-11.5L12 22l11.5-5.5z' fill='%23FFD700' fill-opacity='0.3'/%3E%3C/svg%3E")
      `,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCloseButton: false,
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
      customClass: {
        popup: "rounded-popup",
        title: "custom-title",
      },
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Math.ceil(Swal.getTimerLeft() / 1000)}`;
        }, 100);

        // Menambahkan style untuk popup
        const popup = Swal.getPopup();
        popup.style.border = "3px solid #FFD700";
        popup.style.borderRadius = "20px";
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  }

  return null;
}

export default StudentProfileModal;
