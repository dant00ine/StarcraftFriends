class VotesController < ApplicationController
    def create
        @vote = Vote.where(vote_params).first
        if @vote
          @vote = Vote.update(@vote.id, character_id: vote_params[:character_id])
        else
          @vote = Vote.create(vote_params)
        end
        render json: {vote: @vote}
    end

    def vote_params
      params.require(:vote).permit(:voter_id, :votee_id, :group_id, :character_id)
    end
end
