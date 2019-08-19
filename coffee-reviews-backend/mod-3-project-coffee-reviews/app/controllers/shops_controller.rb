class ShopsController < ApplicationController

  def index
      shops = Shop.all
      render json: shops
    end

    def show
      shop = Shop.find(params[:id])
      render json: shop
    end

end
