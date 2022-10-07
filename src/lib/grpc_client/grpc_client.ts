import type {RemoteProcedure} from "./grpc_config"

type Config = {
	header?: GrpcHeader
	host: string
	insecure?: boolean
}

type GrpcHeader = {
	                  "content-type"?: string,
	                  ":method"?: "GET" | "POST",
	                  ":scheme"?: "http" | "https",
	                  ":path"?: string,
	                  ":authority"?: string,
	                  "te"?: string,
	                  "user-agent"?: string,
	                  "grpc-timeout"?: string,
	                  "grpc-encoding"?: string,
	                  authorization?: string
                  } & Record<string, string>

const DEFAULT_GRPC_HEADER: GrpcHeader = {
	"user-agent"  : "grpc-javascript/0.1",
	"content-type": "application/grpc+proto",
	"grpc-timeout": "15S"
}

class GrpcClient {
	constructor(private cfg: Config) {
		if (!cfg.host) throw Error("Missing host!")
	}

	async call(procedure: RemoteProcedure, payload: any): Promise<any> {
		//	const resp = await fetch(this.cfg.host, {headers: {}}).then(it => it.blob())
		// TODO: implement grpc client here
	}
}
