import React from 'react';
import './App.css';

import Screen from './Session/Screen';

function App() {
  
  const fieldList = [
    { startRow: 0,
      startColumn: 0,
      text: '*****************************             +----------------------------------+  ****************---**********             | IP ADDRESS   : 192.168.58.175    |  *********-    ______  *******             | LUNAME       : OA2BRQAJ          |  *****_-    -**********- *****             | PORT ADDRESS : 43740             |  **-      _______    *********             | DATA / HORA  : 08/30/20 16:56:44 |  *****-  **********-    ******             +----------------------------------+  ****-  **************-   ****                                                   ****-  ***************-   ***                                                   *****- ****************-  ***    *****                *                         ******- *******-  ****-  ****    *    *               *                         ******** ******-  *** *******    *    *  * *  **    ***   **    **    **   **   ***********- **-  ***********    *****   **     *  *  *  *  *  *     *    *  *  ***********- **-  ***********    *    *  *    ***  *  *  ****   **   *    *  *  ***********- **-  ***********    *    *  *   *  *  *  *  *        *  *    *  *  ***********- **-  ***********    *****   *    ***   ***   **    **    **   **                                                                                   +----------------------------------------------------------------------------+  | Esta conexão é específica e de uso exclusivo de empresas via Rede Empresa  |  | Caso  haja  alguma  irregularidade  nas  informações  apresentadas,  favor |  | contactar  nossa  Central  de  Atendimento  DITI:  (0 xx 11)  4197-2222    |  | Empresas                                                                   |  +----------------------------------------------------------------------------+ ',
      fieldLength: 1840,
      isProtected: true,
      isHidden: false,
      isHighLight: false
    } ,
    { startRow: 23,
      startColumn: 29,
      text: 'Teste',
      fieldLength: 50,
      isProtected: false,
      isHidden: false,
      isHighLight: false
    }
  ]

  return (
    <div className="App">
      <Screen 
        fieldList={fieldList}
        onkeyup={onkeyup}
        onkeydown={onkeydown} />
    </div>
    );
  }
  
  export default App;