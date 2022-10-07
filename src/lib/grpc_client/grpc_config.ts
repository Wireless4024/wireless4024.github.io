export type GrpcConfig = {
	__info__?: GrpcClientInfo
	host?: string
	proto: string
	procedures: RemoteProcedure[]
}

const GRPC_CLIENT_INFO = {
	client_url: window.location.href
}
type GrpcClientInfo = typeof GRPC_CLIENT_INFO
export type RemoteProcedure = {
	package: string
	method: string
	format: 'text' | 'grpc'
	payload?: any
}

export function normalize_config(cfg: GrpcConfig): GrpcConfig {
	cfg.__info__ = GRPC_CLIENT_INFO
	return cfg
}

export function from_proto(proto: string, host?: string): GrpcConfig {
	return {
		__info__  : GRPC_CLIENT_INFO,
		host,
		proto,
		procedures: []
	}
}