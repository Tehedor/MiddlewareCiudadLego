## Componentes
### + Raspberry
### + AppSimulator  
### + AppSubsController



---
## AppSimulator
#### 1. *SubsController* app siempre encendida por lo que checkeaaremos el estado alli
>(lo haremos siempre al arrancar al app)

- Mandar una petición get a *"appSubsController"* para saber el estado de las request
    + Con la informacion recibida cambiar el estado de control.json.inicial_state 
    al estado que te halla devuelto 
    
        >true -> Simulation Actived
        >
        >false -> Real Actived
    
    *! Si falla la peticion que lo intnte cada 5 segundos hasta que consiga respuesta*

#### 2. Apretar el boton
##### 2.1 Apretar el boton -> To Simulation
- Mandar peticion a **Raspberry** para pasarla a pause
    + Desactivar todos los componentes

**next():**
- Mandar petición a **AppSubsController** para que cambie el estado de *realationSubs*
    > Real -> Simulation

**next():**
- Arrancar el **AppSimulator**
    > inicial_state:  false -> true


##### 2.2 Apretar el boton -> To real
- Parar **AppSimulator**
    > inicial_state: true -> false

**next():** 
- Mandar petición a **AppSubsController** para que cambie el estado de *realationSubs*
    > Simulation -> Real

**next():**
- Mandar peticion a **Raspberry** para pasarla a start
    + Arrancar raspberry


-----------------------------------------------------------------------------------------------
## RaspberryCode
(lo haremos siempre al arrancar al script)
- Mandar una petición get a "appSubsController" para saber el estado de las request
    + Con la informacion recibida cambiar el estado de control.json.inicial_state 
    al estado que te halla devuelto
        > true  -> Simulation Actived
        >
        > false  -> Real Actived        
    *! Si falla la peticion que lo intnte cada 5 segundos hasta que consiga respuesta*

    + Dependiendo el estado que se reciba se quedará en modo espera o en modo activado



- Script General:
    + pause -> Destruir todas las maquinas

    + start -> Arrancar todas las maquinas