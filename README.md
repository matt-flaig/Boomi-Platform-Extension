<br />
<p align="center">
  <a href="logo/extensionLogo.png">
    <img src="logo/extensionLogo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Boomi Platform Enhancer Extension</h3>

  <p align="center">
    Provides User Enhancements to the Boomi Platform
    <br />
    <br />
    <a href="https://chrome.google.com/webstore/detail/boomi-platform-enhancer/behhfojpggobllhaifocfcampokbfhko">View Chrome Store</a>
    ·
    <a href="https://gitlab.com/mjs-integration/boomi/chromium-addons/boomi-platform-extension/-/boards/1957917">Request a feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

The Boomi Platform Enhancer Extension came about from the need to adjust the current default Boomi Web Platform IDE and display to provide a more desirable layout and adjustments to make development and general usage with in the Boomi Cloud platform more robust. 


Here's why:
* I wanted more functionality and better overall setup; so instead of waiting I just did.
* Boomi takes community feedback however its not perfect and unless its gets a score of XXX it does not really get a look at and to me these feel a must.


### Built With
The main frameworks of this extension are the following + the ide used.
* [JQuery](https://jquery.com)
* [JavaScript](https://www.javascript.com/)
* [Visual Studio Code](https://code.visualstudio.com/)



## Getting Started

To get started simply visit the [Chrome WebStore](https://chrome.google.com/webstore/detail/boomi-platform-enhancer/behhfojpggobllhaifocfcampokbfhko") and install the addon; once done it will auto-enable when on the Boomi Web Platform.


### Installation

1. [Visit the Chrome WebStore](https://chrome.google.com/webstore/detail/boomi-platform-enhancer/behhfojpggobllhaifocfcampokbfhko")
2. Click Install



## Usage

The following provides the current abilities of the released extension for use within the Boomi Web Platform.

* Keyboard Short Cuts
  * Ctrl+Alt + S = Save Current Flow
  * Ctrl+Alt = Test Current Flow
  * ~ = Full Screen - On/Off
* Adjustments to the portal for integration around font sizing, header and menu sizing to provide more build and processing space within the default view.
* Account dashboard now defaults to 7 days instead of the maximum value.
* Shapes that don't have a end connection will glow.
* Quickly add stop shape to flow by hovering over end arrow and clicking stop.
* Add components directly within the build tab by double clicking the flow and selecting from a drop down.
* Capture the entire flow without resize and save to a local image by using the Capture button on process flow header.
* Hover over flow shape to see the connection points it make.
* Use notes to group tasks and provide information relating to multiple areas of the flow.
* Add Markdown in the process description or notes to show better visual formatting
* When Table i.e. Process Reporting is displayed; Toggle of Line Wrap available to show in single view.
* Ability to assign keyboard button to easily go into and out of full screen - default is the `/~ key.
* Options have been added to set a key for enable full screen, default is ` Key
* JSON Viewing toggle added to Message and Notify Shape; will both format the json and add the ' quote padding.
* Capture your process flow easily via the Capture Process Flow Button; will capture the entire flow and save to a local file.
* Debug has been enhanced to provide more robust coloring, this includes flashing colors, item selection and error emphasis.
* Ability to Remove the Canvas Build Background (dots) - works will with dark modes 
* Schedule Reminder - Once a deployment has occurred or been deployed to another environment the notification message will also provide a reminder to setup a schedule if required.
* Easily copy the current Component id using the Copy Component ID Button (In the action button - enter full screen etc.)
* Build Shape "connector" Pallet has been restored back to its better life before Boomi UX decided to change it and make it unusable
* Reminders
* Upon successful deployment a reminder will appear that if new it may require to be scheduled.
* Enable the selection of Icon Sets within the Options to define user experience instead of default Boomi UX
* 

<br><br>


  ![Header](chromewebstore/Image1.png)
  ![](/chromewebstore/Image2.png)
  ![](/chromewebstore/Image3.png)
  ![](/chromewebstore/Image4.png)
  ![](/chromewebstore/Image5.png)




<!-- ROADMAP -->
## Roadmap

See the [open Requests / Changes](https://gitlab.com/mjs-integration/boomi/chromium-addons/boomi-platform-extension/-/boards/1957917) for a list of proposed features (and known issues).



## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




## License

Distributed under the MIT License. See `LICENSE` for more information.




## Contact

Name - [Mitchell Franklin](https://mitchellfranklin.info) - mitchellfranklin@gmail.com





<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* **Tony Banik** - Developer of Boomi Tools that provided me with some of the best ideas that are implemented or being implemented into this Extension.
* [Baptiste BIEBER](https://github.com/baptistebieber) - Developer of Boomi Extension that provided idea for future enhancements
* **Noah Skelton** - Developer of the Build Pallet Fix Script used to return the UX for Shapes back to what it was
* [Boomi Developer (Boomian)](https://gitlab.com/boomian) - Providing script and feature enhancements to the project
* [Boomi](https://boomi.com/)
* [Boomi Community](https://community.boomi.com/)
* [Choose an Open Source License](https://choosealicense.com)
* [Visual Studio Code](https://code.visualstudio.com/)

