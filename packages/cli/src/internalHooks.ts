import * as telemetryHelpers from './telemtry/helpers';
import { Telemetry } from "./telemtry";
import { IInternalHooksClass } from "./Interfaces";
import { WorkflowEntity } from "./databases/entities/WorkflowEntity";

export class InternalHooks implements IInternalHooksClass {
	private telemetry: Telemetry;

	constructor(telemetry: Telemetry) {
		this.telemetry = telemetry;
	}

	async onServerStarted(): Promise<void> {
		this.telemetry.track('Instance started');
	}

	async onWorkflowSave(workflow: WorkflowEntity): Promise<void> {
		const nodesGraph = telemetryHelpers.generateNodesGraph(workflow);
		this.telemetry.track('User saved workflow', { workflow_id: workflow.id.toString(), nodesGraph });
	}
}
