"""empty message

Revision ID: 22cd270db7a0
Revises: None
Create Date: 2016-11-02 10:59:49.954400

"""

# revision identifiers, used by Alembic.
revision = '22cd270db7a0'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('todos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('task', sa.String(), nullable=True),
    sa.Column('created_time', sa.Integer(), nullable=True),
    sa.Column('updated_time', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('todos')
    ### end Alembic commands ###
