export const ReservationDetailsHtml = (reservation) => {
    const {check_in, check_out, number_of_people, total, hotel, room, guests} = reservation;
    return `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Booking Confirmation</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif; /* Modern font choice */
          margin: 0;
          padding: 0;
          background-color: #f4f4f4; /* Light background color */
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
    
        .container {
          background-color: #fff;
          padding: 40px;
          border-radius: 10px; /* Rounded corners */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
          max-width: 600px;
          text-align: center;
        }
    
        h1 {
          color: #007bff; /* Blue accent color */
          margin-bottom: 20px;
        }
    
        .icon-check {
          font-size: 60px;
          color: #28a745; /* Green checkmark */
          margin-bottom: 15px;
        }
    
        p {
          line-height: 1.6;
          color: #333; /* Dark gray text */
        }
    
        .booking-details {
          margin-top: 30px;
          text-align: left;
          border-top: 1px solid #eee; /* Divider */
          padding-top: 20px;
        }
    
        .booking-details strong {
          display: block; /* Each label on its own line */
          margin-bottom: 5px;
          color: #555; /* Slightly darker label color */
        }
      </style>
    </head>
    <body>
      <div class="container">
        <span class="icon-check">&#10004;</span>
        <h1>Your Hotel Reservation is Confirmed!</h1>

        <p>Dear ${guests[0].first_name} ${guests[0].last_name},</p>
        <p>Thank you for choosing our hotel. We're excited to welcome you!</p>

        <h2>Booking Summary:</h2>
        <table>
          <tr>
            <td><strong>Check-in:</strong></td>
            <td>${check_in}</td>
          </tr>
          <tr>
            <td><strong>Check-out:</strong></td>
            <td>${check_out}</td>
          </tr>
          <tr>
            <td><strong>People:</strong></td>
            <td>${number_of_people}</td>
          </tr>
          <tr>
            <td><strong>Total:</strong></td>
            <td>$${total} USD</td>
          </tr>
        </table>
        <h2>Hotel</h2>
        <table>
          <tr>
            <td><strong>Hotel:</strong></td>
            <td>${hotel.name}</td>
          </tr>
          <tr>
            <td><strong>Description:</strong></td>
            <td>${hotel.description}</td>
          </tr>
          <tr>
            <td><strong>City:</strong></td>
            <td>${hotel.city}</td>
          </tr>
        </table>

        <h2>Room</h2>
        <table>
          <tr>
            <td><strong>Room:</strong></td>
            <td>${room.name}</td>
          </tr>
          <tr>
            <td><strong>Room Type:</strong></td>
            <td>${room.type}</td>
          </tr>
          <tr>
            <td><strong>Floor:</strong></td>
            <td>${room.floor}</td>
          </tr>
        </table>

        <h2>What's Next?</h2>
        <p>A confirmation email with your booking details and itinerary has been sent to ${guests[0].email}.</p>
        <p>If you have any questions or need to make changes to your reservation, please don't hesitate to contact us.</p>

        <p>We look forward to your stay!</p>
        <p>Sincerely,</p>
        <p>The Hm Team</p>
       
      </div>
    </body>
    </html>
    `;
}