<h1 align="center">TapSitLog<br>
<br>
<p align="center">
  <a href="https://git.io/typing-svg">
   <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=3F72AF&center=true&vCenter=true&width=435&lines=Your+Table%2C+Your+Tech%2C+Your+Order;Kiosk+in+your+pocket" alt="Typing SVG" /></a>
  </a>
</p>  
</h1>

<details>
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#sdg">Sustainable Developement Goal</a></li>
      </ul>
    </li>
    <li><a href="#features">Key Features</a></li>
    <li><a href="#framework">Programming Language and Frameworks Used</a></li>
     <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation and Setup</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributors</a></li>
    <li><a href="#instructor">Instructor</a></li>
    <li><a href="#acknowledgments">Acknowledegment</a></li>
  </ol>
</details>

<h2 id="about-the-project"> About The Project </h2>
<p align="justify">
  &nbsp;&nbsp;&nbsp;&nbsp;<a href="#top"><strong>TapSitLog</strong></a> is a QR code-based restaurant ordering system designed to enhance the dining experience and improve operational efficiency. 
It enables real-time digital ordering, supports contactless service, and provides restaurant staff with management tools to streamline service and reduce errors.
</p>


<!-- SUSTAINABLE DEVELOPMENT GOAL -->
<h2 id="sdg">🌍 Sustainable Development Goal </h2>

<table style="border: none; border-collapse: collapse; width: 100%;">
  <tr style="border: none;">
    <td width="30%" style="border: none; vertical-align: top; padding-right: 20px;">
      <img src="https://github.com/user-attachments/assets/0bff6768-c980-4859-820a-70a14cb5bdbe" width="100%">
    </td>
    <td width="70%" align="justify" style="border: none;">
    TapSitLog aligns with <strong>SDG 8: Decent Work and Economic Growth</strong> by promoting innovation in the restaurant industry. 
    It enhances operational efficiency, reduces the burden on staff, and supports businesses in adapting to digital transformation, 
    contributing to sustained economic growth and improved working conditions.
    </td>
  </tr>
</table>

<!-- KEY FEATURES -->
<h2 id="features">🔑 Key Features </h2>
<ul>
  <li><strong>QR Code Ordering:</strong> Customers scan a table QR code to browse the menu and place orders on their device.</li>
  <li><strong>Order Review:</strong> Items are displayed before checkout for easy confirmation or edits.</li>
  <li><strong>Online Payment:</strong> Secure digital payment options eliminate the need for staff interaction.</li>
  <li><strong>Admin Panel:</strong> View order summaries, filter by table, and monitor inventory.</li>
  <li><strong>OTC Barcode Payment:</strong> Generates a barcode for counter payment, linking directly to the order.</li>
  <li><strong>E-Receipts:</strong> Customers receive a downloadable image receipt after successful payment.</li>
</ul>

<!-- Programming Language and Frameworks Used -->
## 🤖 Programming Language and Frameworks Used

- **Programming Language Used**: [![Node.js][Node-logo]][Node-url] [![Express.js][Express-logo]][Express-url]
- **Framework**: [![React][React-logo]][React-url] [![Node.js][Node-logo]][Node-url]  
- **Frontend**: [![HTML][HTML-logo]][HTML-url] [![CSS][CSS-logo]][CSS-url]  
- **Backend**: [![JavaScript][JS-logo]][JS-url]   
- **Database**: [![MongoDB][MongoDB-logo]][MongoDB-url]  
- **Tools**: [![React Router][ReactRouter-logo]][ReactRouter-url] [![QR Code Generator API][QRCode-logo]][QRCode-url] [![Barcode Generator][Barcode-logo]][Barcode-url] [![Iconify][Iconify-logo]][Iconify-url]

<!-- GETTING STARTED -->
<h2 id="getting-started">🚀 Getting Started </h2>
<p align="justify">
  &nbsp;&nbsp;&nbsp;&nbsp;<a href="#top"><strong>TapSitLog</strong></a>  is a QR code-based ordering system that allows customers to scan table-specific codes, browse the menu, place orders, and make payments. This guide helps you set up the project for local development or deployment in a restaurant LAN or internet-connected environment.
</p>


<!-- INSTALLATION AND SETUP -->
<h2 id="installation">⚒️ Installation and Setup </h2>
<ol> <li> <strong>Download or Clone the Repository:</strong><br> Use the following command to clone the project to your local machine: <pre><code>git clone https://github.com/your-username/TapSitLog.git</code></pre> </li> <li> <strong>Install Backend Dependencies:</strong><br> Navigate to the <code>server</code> directory and install required packages: <pre><code>cd TapSitLog/server<br>npm install</code></pre> </li> <li> <strong>Install Frontend Dependencies:</strong><br> Navigate to the <code>client</code> directory and install required packages: <pre><code>cd ../client<br>npm install</code></pre> </li> <li> <strong>Configure Environment Variables:</strong><br> Create a <code>.env</code> file inside the <code>server</code> directory with the following values: <pre><code>PORT=5000 MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret</code></pre> <p>If needed, create a <code>.env</code> file in the <code>client</code> folder with:</p> <pre><code>REACT_APP_API_URL=http://localhost:5000</code></pre> </li> <li> <strong>Start the Backend Server:</strong><br> Inside the <code>server</code> directory, run: <pre><code>npm start</code></pre> </li> <li> <strong>Start the Frontend Development Server:</strong><br> Inside the <code>client</code> directory, run: <pre><code>npm start</code></pre> </li> <li> <strong>Access the App:</strong><br> Open your browser and go to: <ul> <li><code>http://localhost:3000</code> for the customer interface</li> <li><code>http://localhost:5000</code> (or API endpoints) for backend</li> </ul> </li> </ol>

<!-- USAGE -->
<h2 id="usage">🖥️ Usage </h2>

<h3>👤For Customers</h3>
<ol>
  <li><strong>Scan the QR Code:</strong> Use your smartphone's camera to scan the table-specific QR code.</li>
  
  <li><strong>Access the Digital Menu:</strong> After scanning, you'll be redirected to a mobile-friendly menu page.</li>
  
  <li><strong>Browse and Place Orders:</strong> Select your desired items, customize options (if available), and add them to your cart.</li>
  
  <li><strong>Review Cart and Checkout:</strong> Review your order on the Cart page. You may edit or remove items before confirming.</li>
  
  <li><strong>Choose Payment Method:</strong>
    <ul>
      <li><strong>Online:</strong> Pay securely using GCash or Maya.</li>
      <li><strong>Over-the-Counter (OTC):</strong> A barcode will be generated for the cashier to scan.</li>
    </ul>
  </li>
  
  <li><strong>Receive E-Receipt:</strong> After successful payment, a downloadable image receipt will be provided.</li>
</ol>

<h3>For Restaurant Staff</h3>
<p><strong>👩‍🍳 As a Cashier or Waitstaff:</strong></p>
<ol>
  <li><strong>Access Admin Panel:</strong> Login using your staff credentials.</li>
  
  <li><strong>View Counter Page:</strong> Manually input or edit walk-in or OTC orders.</li>
  
  <li><strong>Scan Barcodes (for OTC):</strong> Use a barcode scanner to retrieve customer orders for payment processing.</li>
</ol>

<h3>👨‍💼 As an Administrator</h3>
<ol>
  <li><strong>Login to Dashboard:</strong> Access the admin dashboard using administrator credentials.</li>
  
  <li><strong>Manage Menu:</strong> Add, update, or remove menu items.</li>
  
  <li><strong>Generate QR and Barcodes:</strong> Use the QR/Barcode Generator to set up table-specific access or OTC payment support.</li>
  
  <li><strong>Monitor Orders and Reports:</strong> View real-time order summaries and transaction histories.</li>
</ol>


<!-- CONTRIBUTORS --> 
<h2 id="contributing">👩‍💻 Contributors</h2> 

<table width="100%" style="border-collapse: collapse;"> 
  <tr> 
    <td align="center" width="25%" style="padding: 10px;"> 
        <img src="https://github.com/user-attachments/assets/c6c68f75-29fc-4fd9-92b1-4ea955a369ff" width="250px;" alt="Ziac's GitHub Profile"/>
      </a>
      <br>
      <b>Abril, Danielle Ziac R.</b>
        <a href="https://github.com/DanielleZiac">
          <img src="https://img.shields.io/badge/GitHub-DanielleZiac-181717?style=for-the-badge&logo=github&logoColor=white" alt="Danielle Ziac's GitHub Profile Badge"/>
        </a>
    </td> 
    <td align="center" width="25%" style="padding: 10px;"> 
       <img src="https://github.com/user-attachments/assets/678d1225-62e3-4258-a022-9de27a4e1352" width="250px;" alt="Rose Ann's GitHub Profile"/>
      </a>
      <br>
      <b>Aguilar, Rose Ann C.</b>
       <a href="https://github.com/roseann11">
         <img src="https://img.shields.io/badge/GitHub-roseann11-181717?style=for-the-badge&logo=github&logoColor=white" alt="Rose Ann's GitHub Profile Badge"/>
      </a>
    </td> 
    <td align="center" width="25%" style="padding: 10px;"> 
          <img src="https://github.com/user-attachments/assets/47071fe7-2cc2-442a-b15e-94b4ce66e955" width="250px;" alt="Nheil's Github Profile"/>
          <br>
          <b>Eduria, Nheil G.</b>
          <br>
            <a href="https://github.com/nheil15">
              <img src="https://img.shields.io/badge/GitHub-nheil15-181717?style=for-the-badge&logo=github&logoColor=white" alt="Nheil's GitHub Profile Badge"/>
            </a>
    </td>
    <td align="center" width="25%" style="padding: 10px;"> 
      <img src="https://github.com/user-attachments/assets/03d7b04e-e0ff-4a5b-b7b6-1de8bd84005e" width="250px;" alt="Vex's Github Profile"/>
      <br>
      <b>Sumang, Vex Ivan C.</b>
      <br>
        <a href="https://github.com/Xevastian">
          <img src="https://img.shields.io/badge/GitHub-Xevastian-181717?style=for-the-badge&logo=github&logoColor=white" alt="Xevastian's GitHub Profile Badge"/>
        </a>
    </td>
  </tr> 
</table>

<h2 id="instructor">👩‍🏫 Instructor </h2>
<h3>Ms. Fatima Marie Agdon, MSCS</h3>

<!-- ACKNOWLEDGEMENT -->
<h2 id="acknowledgments">🙏 Acknowledgement</h2>
<p align="justify">
  &nbsp;&nbsp;&nbsp;&nbsp;We extend our heartfelt gratitude to our team members for their dedication, collaboration, and invaluable contributions to the TapSitLog project. Each member played a vital role, offering unique perspectives and technical skills that shaped the system into what it is. The successful completion of this restaurant ordering system was made possible through teamwork, shared vision, and countless hours of planning, development, and testing. This journey not only strengthened our collaboration but also deepened our understanding of practical software engineering and real-world system design.

  &nbsp;&nbsp;&nbsp;&nbsp;We also sincerely appreciate Ms. Fatima Marie P. Agdon, MSCS, our course instructor, for her consistent guidance, feedback, and support throughout the development of this project. Her insights and expertise were instrumental in helping us apply key software engineering principles and stay aligned with best practices.

  &nbsp;&nbsp;&nbsp;&nbsp;Thank you for your dedication, passion, and support in helping us bring this project to life.
</p>


[JS-logo]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black  
[JS-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript  
[React-logo]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black  
[React-url]: https://reactjs.org/  
[Node-logo]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white  
[Node-url]: https://nodejs.org/  
[HTML-logo]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white  
[HTML-url]: https://developer.mozilla.org/en-US/docs/Web/HTML  
[CSS-logo]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white  
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS  
[MongoDB-logo]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white  
[MongoDB-url]: https://www.mongodb.com/  
[ReactRouter-logo]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white  
[ReactRouter-url]: https://reactrouter.com/  
[QRCode-logo]: https://img.shields.io/badge/QR_Code_Generator-000000?style=for-the-badge&logo=qr-code&logoColor=white  
[QRCode-url]: https://www.qr-code-generator.com/  
[Barcode-logo]: https://img.shields.io/badge/Barcode_Generator-FFD700?style=for-the-badge&logo=barcode&logoColor=white  
[Barcode-url]: https://www.barcodesinc.com/generator/index.php  
[Iconify-logo]: https://img.shields.io/badge/Iconify-000000?style=for-the-badge&logo=iconify&logoColor=white  
[Iconify-url]: https://iconify.design/
[Express-logo]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white  
[Express-url]: https://expressjs.com/  

