from flask_restx import Resource
from webapp.api.utils import get_url_parameter
from webapp.extensions import cache
from webapp.models import RankingPlayer
from webapp.models.enums import Server
import typing


class PlayerOverviewView(Resource):
    def get(self, server: typing.Optional[str] = None):
        min_level_land = get_url_parameter("min_lv_land", int, 1)

        resp = self._get_response(
            server=server,
            min_level_land=min_level_land
        )

        return resp, 200

    @cache.memoize(timeout=0)
    def _get_response(
        self,
        server: str,
        min_level_land: int,
    ) -> dict:
        query = (
            RankingPlayer.query
            .filter(
                RankingPlayer.level_land >= min_level_land,
            )
        )

        if server:
            server_value = 0 if server == "luxplena" else 1
            query = query.filter(RankingPlayer.server == Server(server_value))

        return [player.to_dict(minimal=True) for player in query.all()]
