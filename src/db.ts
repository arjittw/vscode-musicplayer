import * as vscode from "vscode";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

export let db: JsonDB;

export function initDb(context: vscode.ExtensionContext) {
    db = new JsonDB(
        new Config(
            vscode.Uri.joinPath(context.globalStorageUri, "db.json").fsPath,
            true,
            false,
            "/"
        )
    );
}

