

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### Orion LD
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####


getHeartbeat(){
	eval "response=$(docker run --network fiware_default --rm quay.io/curl/curl:8.4.0 -s -o /dev/null -w "%{http_code}" "$1")"
}

waitForOrion () {
	echo -e "\n⏳ Waiting for \033[1;34mOrion-LD\033[0m to be available\n"
	
	while ! [ `docker inspect --format='{{.State.Health.Status}}' fiware-orion` == "healthy" ]
	do
		echo -e "\nContext Broker HTTP state: ${response} (waiting for 200)"
		pause 6
		echo ${ORION}
		getHeartbeat "${ORION}"
	done
}

waitForCoreContext () {
	echo -e "\n⏳ Checking availability of \033[1m core @context\033[0m from ETSI\n"
	eval "response=$(docker run --rm quay.io/curl/curl:8.4.0 -s -o /dev/null -w "%{http_code}" "$CORE_CONTEXT")"
	while [ "${response}" -eq 000 ]
	do
		echo -e "\n@context HTTP state: ${response} (waiting for 200)"
		pause 3
		eval "response=$(docker run --rm quay.io/curl/curl:8.4.0 -s -o /dev/null -w "%{http_code}" "$CORE_CONTEXT")"
	done
}

waitForUserContext () {
	echo -e "\n⏳ Waiting for user \033[1m@context\033[0m to be available\n"
	getHeartbeat "${CONTEXT}"
	while [ "${response}" -eq 000 ]
	do
		echo -e "\n@context HTTP state: ${response} (waiting for 200)"
		pause 3
		getHeartbeat "${CONTEXT}"
	done
}

waitForMongoOrion () {
	echo -e "\n⏳ Waiting for \033[1mMongoDB Orion\033[0m to be available\n"
	while ! [ `docker inspect --format='{{.State.Health.Status}}' mongo-db-orion` == "healthy" ]
	do 
		sleep 1
	done
}


stoppingContainersOrion () {
	CONTAINERS=$(docker ps --filter "label=org.fiware=orion" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
	VOLUMES=$(docker volume ls -qf "label=org.fiware=orion") 
	if [[ -n $VOLUMES ]]; then 
		echo "Removing old volumes"
		docker volume rm $VOLUMES || true
	fi
	NETWORKS=$(docker network ls  --filter "label=org.fiware=orion" -q) 
	if [[ -n $NETWORKS ]]; then 
		echo "Removing orion networks"
		docker network rm $NETWORKS || true
	fi
}

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### Draco
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

# Draco
stoppingContainersDraco () {
	CONTAINERS=$(docker ps --filter "label=org.fiware=draco" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
	VOLUMES=$(docker volume ls -qf "label=org.fiware=draco") 
	if [[ -n $VOLUMES ]]; then 
		echo "Removing old volumes"
		docker volume rm $VOLUMES || true
	fi
	NETWORKS=$(docker network ls  --filter "label=org.fiware=draco" -q) 
	if [[ -n $NETWORKS ]]; then 
		echo "Removing draco networks"
		docker network rm $NETWORKS || true
	fi
}

waitForDraco () {
	echo -e "\n⏳ Waiting for \033[1;34mDraco\033[0m to be available\n"

	while ! [ `docker inspect --format='{{.State.Health.Status}}' draco` == "healthy" ]
	do
		sleep 1
	done
}

# BD
waitForMysql () {
	echo -e "\n⏳ Waiting for \033[1mMySQL draco\033[0m to be available\n"
	while ! [ `docker inspect --format='{{.State.Health.Status}}' db-mysql-draco` == "healthy" ]
	do 
		sleep 1
	done
}

waitForMongoDraco () {
	echo -e "\n⏳ Waiting for \033[1mMongoDB Draco\033[0m to be available\n"
	# while ! [ `docker inspect --format='{{.State.Health.Status}}' db-mongo` == "healthy" ]
	while ! [ `docker inspect --format='{{.State.Health.Status}}' mongo-db-draco` == "healthy" ]
	do 
		sleep 1
	done
}

waitForPostgres () {
	echo -e "\n⏳ Waiting for \033[1mPostgreSQL\033[0m to be available\n"
	while ! [ `docker inspect --format='{{.State.Health.Status}}' db-postgres-draco` == "healthy" ]
	do 
		sleep 1
	done
}


waitForDracoInit() {
  echo -e "\n⏳ Esperando a que \033[1mDraco Init\033[0m termine..."

  while docker ps -a --format '{{.Names}}' | grep -q "^fiware-draco-init-1$"; do
    status=$(docker inspect --format='{{.State.Status}}' fiware-draco-init-1 2>/dev/null)

    if [ "$status" = "exited" ]; then
      exit_code=$(docker inspect --format='{{.State.ExitCode}}' fiware-draco-init-1)
      if [ "$exit_code" -eq 0 ]; then
        echo -e "\n✅ \033[1mDraco Init finalizado correctamente\033[0m"
      else
        echo -e "\n❌ \033[1mDraco Init terminó con errores (exit code $exit_code)\033[0m"
      fi
      break
    fi

    echo -n "."
    sleep 1
  done

}


##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### Simulator
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

stoppingContainerAppSimulator() {
	CONTAINERS=$(docker ps --filter "name=simulator-app" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
}


waitForSimulatorApp() {
	echo -e "\n⏳ Waiting for \033[1mSimulator App\033[0m to be available\n"

	while ! [ `docker inspect --format='{{.State.Health.Status}}' simulator-app` == "healthy" ]
	do 
		sleep 1
	done
}

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### subs-control-app
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

stoppingContainerAppSubsControl() {
	CONTAINERS=$(docker ps --filter "name=subs-control-app" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
}


waitForSubsControlApp() {

	echo -e "\n⏳ Waiting for \033[1mSubs Control App\033[0m to be available\n"

	while ! [ `docker inspect --format='{{.State.Health.Status}}' subs-control-app` == "healthy" ]
	do 
		sleep 1
	done
}

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### miniobucket
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

stoppingContainerMinioBucket() {
	CONTAINERS=$(docker ps --filter "name=minio-bucket" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
}


waitForMinioBucket() {

	echo -e "\n⏳ Waiting for \033[1mMinio Bucket \033[0m to be available\n"

	while ! [ `docker inspect --format='{{.State.Health.Status}}' minio-bucket` == "healthy" ]
	do 
		sleep 1
	done
}

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### proxy-reverse
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

# stoppingContainerAppSubsControl() {
# 	CONTAINERS=$(docker ps --filter "name=subs-control-app" -aq)
# 	if [[ -n $CONTAINERS ]]; then 
# 		echo "Stopping containers"
# 		docker rm -f $CONTAINERS || true
# 	fi
# }
stoppingContainerProxyReverse() {
	${dockerCmd} -f proxy-reverse/nginx-reverse.yml  down
	# CONTAINERS=$(docker ps --filter "name=nginx-reverse" -aq)
	# if [[ -n $CONTAINERS ]]; then 
	# 	echo "Stopping containers"
	# 	docker rm -f $CONTAINERS || true
	# fi
}

waitForProxyReverse() {
	echo -e "\n⏳ Waiting for \033[1mProxy Reverse\033[0m to be available\n"
	while ! [ `docker inspect --format='{{.State.Health.Status}}' nginx-reverse-container` == "healthy" ]
	do 
		sleep 1
	done
}



##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ApisApp
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####

stopContainerApisApp() {
	CONTAINERS=$(docker ps --filter "name=apis-app" -aq)
	if [[ -n $CONTAINERS ]]; then 
		echo "Stopping containers"
		docker rm -f $CONTAINERS || true
	fi
}

waitForApisApp() {
	echo -e "\n⏳ Waiting for \033[1mApis App\033[0m to be available\n"

	while ! [ `docker inspect --format='{{.State.Health.Status}}' apis-app` == "healthy" ]
	do 
		sleep 1
	done
}


##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### Comando Help
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
displayHelp() {
	echo -e "\n\033[1;4m🔧 Tutorial Service Manager Help\033[0m\n"
	echo -e "Usage:\n  \033[1m./services <command> [subcommand]\033[0m\n"

	echo -e "\033[1;36mMain Commands:\033[0m"
	echo -e "  \033[1mcreate\033[0m             Inicializa todos los recursos (sin ejecutar contenedores)."
	echo -e "  \033[1mstart[1|2|3]\033[0m       Inicia grupos de servicios definidos:"
	echo -e "                         \033[1mstart1\033[0m → Orion, Draco, MinIO"
	echo -e "                         \033[1mstart2\033[0m → Simulador"
	echo -e "                         \033[1mstart3\033[0m → APIs App"
	echo -e "  \033[1mstop[1|2|3]\033[0m        Detiene los grupos respectivos."
	echo -e "  \033[1mstop-all\033[0m           Detiene todos los servicios."
	echo -e "  \033[1mbuild\033[0m              Descarga las imágenes necesarias."
	echo -e "  \033[1mprune\033[0m              Limpia recursos Docker no utilizados.\n"

	echo -e "\033[1;36mServicios individuales:\033[0m"
	echo -e "  \033[1morion\033[0m              Inicia Orion-LD, Mongo, IoT-Agent y contexto."
	echo -e "  \033[1mstop-orion\033[0m         Detiene Orion y servicios asociados."
	echo -e "  \033[1mdraco\033[0m              Inicia Draco (Mongo) para persistencia."
	echo -e "  \033[1mstop-draco\033[0m         Detiene Draco."
	echo -e "  \033[1msimulator\033[0m          Inicia la app simuladora de sensores."
	echo -e "  \033[1mstop-simulator\033[0m     Detiene el simulador."
	echo -e "  \033[1msubs-control-app\033[0m   Inicia el gestor de suscripciones."
	echo -e "  \033[1mstop-subs-control-app\033[0m Detiene el gestor de suscripciones."
	echo -e "  \033[1mminio-bucket\033[0m       Inicia MinIO y crea el bucket."
	echo -e "  \033[1mstop-minio-bucket\033[0m  Detiene el servicio MinIO."
	echo -e "  \033[1mapis-app\033[0m           Inicia la app de APIs externas."
	echo -e "  \033[1mstop-apis-app\033[0m      Detiene la app de APIs externas.\n"

	echo -e "\033[1;36mExtras:\033[0m"
	echo -e "  \033[1mhelp\033[0m               Muestra esta ayuda."
	echo -e "  \033[1m⚠️  Algunos comandos requieren que el archivo .env esté presente y bien configurado.\033[0m\n"

	echo -e "\033[3mEjemplo:\033[0m"
	echo -e "  \033[0;33m./services start1\033[0m   → Levanta el stack básico Orion, Draco y MinIO\n"
}
