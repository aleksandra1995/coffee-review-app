class CreateShops < ActiveRecord::Migration[6.0]
  def change
    create_table :shops do |t|
      t.string :img
      t.string :name
      t.string :location

      t.timestamps
    end
  end
end
