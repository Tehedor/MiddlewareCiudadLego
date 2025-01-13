require('dotenv').config();

function convertToBoolean(envVar) {
    return envVar ? envVar === 'true' : false;
}

console.log(convertToBoolean('true'));

const {

    WEB_APP_PORT                    :web_app_port= 3030,
    DUMMY_DEVICES_PORT              :dummy_devices_port= 3001,

    DEVICE_NUMBER                   :device_number='001',

    INTENSITY_THRESHOLD             :intensity_threshold= 70,

    INICIAL_STATE                   :inicial_state= true,
    MODE_STATE                      :mode_state= false,
    TIME_INTERVAL                   :time_interval= 250,

    SIMULATE_PIR_SENSOR             :simulate_pir_sensor= true,
    SIMULATE_PHOTORESISTOR_SENSOR   :simulate_photoresistor_sensor= true,
    SIMULATE_POTENTIOMETER_SENSOR   :simulate_potentiometer_sensor= false,
    SIMULATE_INFRARED_SENSOR        :simulate_infrared_sensor= false,
    SIMULATE_SWITCH_SENSOR          :simulate_switch_sensor= false,
    SIMULATE_RFID_SENSOR            :simulate_rfid_sensor= false,
    SIMULATE_ULTRASOUND_SENSOR      :simulate_ultrasound_sensor= false,
    SIMULATE_WEATHER_STATION        :simulate_weather_station= false,

    TIMER_PIR_SENSOR                :timer_pir_sensor= 2000,
    TIMER_PHOTORESISTOR_SENSOR      :timer_photoresistor_sensor= 10000,
    TIMER_POTENTIOMETER_SENSOR      :timer_potentiometer_sensor= 20000,
    TIMER_INFRARED_SENSOR           :timer_infrared_sensor= 3000,
    TIMER_SWITCH_SENSOR             :timer_switch_sensor= 500000,
    TIMER_RFID_SENSOR               :timer_rfid_sensor= 40000,
    TIMER_ULTRASOUND_SENSOR         :timer_ultrasound_sensor= 20000,
    TIMER_WEATHER_STATION           :timer_weather_station= 600000,

    MODE_CONTAINERS                 :mode_containers= true,

    WEATHER_API_KEY                 :wather_api_key= 'd9cde8b16d65f14446e43bd0c7e7dffd',

    RASPBERRY_IP                    :raspberry_ip= 'localhost', 
    // RASPBERRY_IP                    :raspberry_ip= 'localhost', 
    RASPBERRY_PORT                  :raspberry_port= 3000,    

    SUBSCONROLLERAPP_PORT           :subsContollerApp_port= 4040,
    SUBSCONROLLERAPP_HOST           :subsContollerApp_host= 'subs-control-app',

} = process.env;

const EnvConfig = () => ({ 
    web_app_port                    :Number(web_app_port),
    dummy_devices_port              :Number(dummy_devices_port),         
    mode_containers                 :convertToBoolean(mode_containers),
    device_number,                  


    intensity_threshold             :Number(intensity_threshold),
    inicial_state                   :convertToBoolean(inicial_state),
    mode_state                      :convertToBoolean(mode_state),
    time_interval                   :Number(time_interval),

    simulate_pir_sensor             :convertToBoolean(simulate_pir_sensor),
    simulate_photoresistor_sensor   :convertToBoolean(simulate_photoresistor_sensor),
    simulate_potentiometer_sensor   :convertToBoolean(simulate_potentiometer_sensor),
    simulate_infrared_sensor        :convertToBoolean(simulate_infrared_sensor),
    simulate_switch_sensor          :convertToBoolean(simulate_switch_sensor),
    simulate_rfid_sensor            :convertToBoolean(simulate_rfid_sensor),
    simulate_ultrasound_sensor      :convertToBoolean(simulate_ultrasound_sensor),
    simulate_weather_station        :convertToBoolean(simulate_weather_station),
    
    timer_pir_sensor                :Number(timer_pir_sensor),
    timer_photoresistor_sensor      :Number(timer_photoresistor_sensor),
    timer_potentiometer_sensor      :Number(timer_potentiometer_sensor),
    timer_infrared_sensor           :Number(timer_infrared_sensor),
    timer_switch_sensor             :Number(timer_switch_sensor),
    timer_rfid_sensor               :Number(timer_rfid_sensor),
    timer_ultrasound_sensor         :Number(timer_ultrasound_sensor),
    timer_weather_station           :Number(timer_weather_station),
    wather_api_key,

    raspberry_ip,
    raspberry_port,

    subsContollerApp_host,
    subsContollerApp_port,
});

module.exports = EnvConfig;

// validar  tipos con zod (no lo voy a hacer)