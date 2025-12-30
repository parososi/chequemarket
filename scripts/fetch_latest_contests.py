"""Fetch latest Caixa lottery contests and write condensed JSON."""
import json
from datetime import datetime
import urllib.request

MODALITIES = {
    "megasena": {"name": "Mega-Sena"},
    "quina": {"name": "Quina"},
    "lotofacil": {"name": "Lotofácil"},
    "lotomania": {"name": "Lotomania"},
    "timemania": {"name": "Timemania"},
    "diadesorte": {"name": "Dia de Sorte"},
    "duplasena": {"name": "Dupla Sena"},
    "supersete": {"name": "Super Sete"},
    "maismilionaria": {"name": "+Milionária"},
}


def fetch_json(url: str):
    with urllib.request.urlopen(url) as resp:
        return json.loads(resp.read())


def parse_contest(modality_id: str, payload: dict):
    base = {
        "id": modality_id,
        "name": MODALITIES.get(modality_id, {}).get("name", modality_id),
        "contest": payload.get("numero"),
        "drawDate": payload.get("dataApuracao"),
        "numbers": payload.get("listaDezenas") or payload.get("dezenasSorteadasOrdemSorteio"),
    }

    if modality_id == "duplasena":
        base["secondDraw"] = payload.get("listaDezenasSegundoSorteio")
    if modality_id == "maismilionaria":
        base["trevos"] = payload.get("trevosSorteados") or payload.get("listaTrevosSorteados")
    return base


def main():
    snapshot = {"generatedAt": datetime.utcnow().isoformat() + "Z", "modalities": {}}
    for modality in MODALITIES:
        url = f"https://servicebus2.caixa.gov.br/portaldeloterias/api/{modality}"
        payload = fetch_json(url)
        snapshot["modalities"][modality] = parse_contest(modality, payload)
    with open("contests.json", "w", encoding="utf-8") as fp:
        json.dump(snapshot, fp, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
