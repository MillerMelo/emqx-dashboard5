import { BackendI18n, SSL } from './common'
import { BridgeStatus, BridgeType, ConnectorType, MQTTBridgeDirection, QoSLevel } from './enum'

export type Metrics = Record<string, number>

export interface NodeMetrics {
  node: string
  metrics: Metrics
}

export interface NodeStatus {
  node: string
  status: string
}

export interface Headers {
  'content-type': string
}

export interface OutputItemObj {
  function: string
  args?: {
    payload: string
    topic: string
    qos: QoSLevel
  }
}

/**
 * is string when output is bridge
 * is obj when output is console or repub
 */
export type OutputItem = string | OutputItemObj

export type FromData = Array<string> | string

export interface BasicRule {
  name: string
  sql: string
  outputs: Array<OutputItem> | OutputItem
  description: string
}

export interface RuleForm extends BasicRule {
  created_at: string
  enable: boolean
  from: FromData
  metrics: Metrics
  node_metrics: NodeMetrics
}

export interface RuleItem extends RuleForm {
  id: string
}

export interface BridgeBaseData {
  id: string
  metrics: Metrics
  name: string
  node_metrics: Array<NodeMetrics>
  node_status: Array<NodeStatus>
  status: BridgeStatus
  type: BridgeType
  local_topic: string
}

export interface HTTPBridge extends BridgeBaseData {
  body: string
  connect_timeout: string
  enable_pipelining: boolean
  headers: Headers
  max_retries: number
  method: string
  pool_size: number
  request_timeout: string
  ssl: SSL
  url: string
}

export interface MQTTOut extends BridgeBaseData {
  connector: string
  direction: MQTTBridgeDirection
  payload: string
  remote_topic: string
  retain: boolean
  remote_qos: QoSLevel
}

export type MQTTIn = MQTTOut & {
  local_qos: QoSLevel
}

export type BridgeItem = HTTPBridge | MQTTOut | MQTTIn

export interface ConnectorBase {
  name: string
}

export type ConnectorMQTT = Omit<ConnectorBase, 'type'> & {
  type: ConnectorType.MQTT
  clean_start: boolean
  clientid: string
  keepalive: string
  max_inflight: number
  mode: string
  password: string
  proto_ver: string
  reconnect_interval: string
  retry_interval: string
  server: string
  ssl: SSL
  username: string
}

export type ConnectorItem = ConnectorMQTT

export interface RuleEvent {
  columns: string[]
  description: BackendI18n
  event: string
  sql_example: string
  test_columns: Record<string, string>
  title: BackendI18n
}
