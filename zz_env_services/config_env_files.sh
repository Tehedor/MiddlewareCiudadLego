# Env Files
envFileApisApp=""
envFileBucketMinio=""
envFileOrion=""
envFileDraco=""
envFileSimulator=""
envFileSubsControl=""
envFileProxyReverse=""

export $(grep -v '^#' .env | grep -v '^$' | xargs)
if [[ "${ENVIRONMENT_FILES_MODE}" == "true" ]]; then
	if [[ -s "./zz_env_services/apis_app.env" ]]; then
		envFileApisApp='--env-file ./zz_env_services/apis_app.env'
	fi
	if [[ -s "./zz_env_services/bucket_minio.env" ]]; then
		envFileBucketMinio='--env-file ./zz_env_services/bucket_minio.env'
	fi
	if [[ -s "./zz_env_services/orion.env" ]]; then
		envFileOrion='--env-file ./zz_env_services/orion.env'
	fi
	if [[ -s "./zz_env_services/draco.env" ]]; then
		envFileDraco='--env-file ./zz_env_services/draco.env'
	fi
	if [[ -s "./zz_env_services/simulator.env" ]]; then
		envFileSimulator='--env-file ./zz_env_services/simulator.env'
	fi
	if [[ -s "./zz_env_services/subs_control.env" ]]; then
		envFileSubsControl='--env-file ./zz_env_services/subs_control.env'
	fi
	if [[ -s "./zz_env_services/proxy_reverse.env" ]]; then
		envFileProxyReverse='--env-file ./zz_env_services/proxy_reverse.env'
	fi
fi
# echo "Environment files loaded: ${envFileApisApp} ${envFileBucketMinio} ${envFileOrion} ${envFileDraco} ${envFileSimulator} ${envFileSubsControl} ${envFileProxyReverse}"