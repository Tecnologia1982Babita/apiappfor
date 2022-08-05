const express = require('express');

const VendaController = require('./controllers/VendaController');

const VendadiaController = require('./controllers/VendadiaController');

const VendamesController = require('./controllers/VendamesController');

const EstoquetotalController = require('./controllers/EstoquetotalController');

const UsuariosController = require('./controllers/UsuariosController');

const VendestgeralController = require('./controllers/VendestgeralController');

const VendestgeraltesteController = require('./controllers/VendestgeraltesteController');

const MovlogdiaController = require('./controllers/MovlogdiaController');

const MovlogdiadfController = require('./controllers/MovlogdiadfController');

const InsertFor251Controller = require('./controllers/InsertFor251Controller');

const SelectvinculoFor251Controller = require('./controllers/SelectvinculoFor251Controller');

const SelectcodigoFor251Controller = require('./controllers/SelectcodigoFor251Controller');

const SelectrevistaFor251Controller = require('./controllers/SelectrevistaFor251Controller');

const VendestgeralitemController = require('./controllers/VendestgeralitemController');

const VendestgeralitemtamController = require('./controllers/VendestgeralitemtamController');

const Aculoja = require('./controllers/Aculoja');



const VendestgeralitemlojaController = require('./controllers/VendestgeralitemlojaController');

const ultimaatualizacao = require('./controllers/ultimaatualizacao');

const Aculojaloja = require('./controllers/Aculojaloja');

const Aculojalojaloja = require('./controllers/Aculojalojaloja');

const Aculoja4 = require('./controllers/Aculoja4');

const cpfcnpjvinculo = require('./controllers/cpfcnpjvinculo');

const todositensporcodigoloja = require('./controllers/todositensporcodigoloja');

const usuarios = require('./controllers/usuarios');

const combocodigo = require('./controllers/combocodigo');

const comboloja = require('./controllers/comboloja');

const consultaconso = require('./controllers/consultaconso');

const totitemdff = require('./controllers/totitemdff');

const totitement = require('./controllers/totitement');

const totitempe = require('./controllers/totitempe');

const totitemtr = require('./controllers/totitemtr');

const totitementdcdt = require('./controllers/totitementdcdt');

const totitempedcdt = require('./controllers/totitempedcdt');

const totitemdffdcdt = require('./controllers/totitemdffdcdt');

const totitemtrdcdt = require('./controllers/totitemtrdcdt');

const totitementcod = require('./controllers/totitementcod');

const totitempecod = require('./controllers/totitempecod');

const totitemdffcod = require('./controllers/totitemdffcod');

const totitemtrcod = require('./controllers/totitemtrcod')

const totitementdoc = require('./controllers/totitementdoc');

const totitempedoc = require('./controllers/totitempedoc')

const totitemdffdoc = require('./controllers/totitemdffdoc');

const totitemtrdoc = require('./controllers/totitemtrdoc');

const checkpro = require('./controllers/checkpro');

const InsertRevFor251Controller = require('./controllers/InsertRevFor251Controller');

const SelectRevFor251Controller = require('./controllers/SelectRevFor251Controller');

const SelectGrupFor251Controller = require('./controllers/SelectGrupFor251Controller');

const SelectGrupVinFor251Controller = require('./controllers/SelectGrupVinFor251Controller');

const consultadfmovimentacoes = require('./controllers/consultadfmovimentacoes');

const consultaentmovimentacoes = require('./controllers/consultaentmovimentacoes');

const insertdfmovimentacoes = require('./controllers/insertdfmovimentacoes');

const insertentmovimentacoes = require('./controllers/insertentmovimentacoes');

const insertdfitensmovimentacoes = require('./controllers/insertdfitensmovimentacoes');

const insertentitensmovimentacoes = require('./controllers/insertentitensmovimentacoes');



const routes = express.Router();

routes.get('/Vendas/:for_cod/:data/:data2',VendaController.index);

routes.get('/Vendasdia/:for_cod/:data',VendadiaController.index);

routes.get('/Vendasmes/:for_cod/:data/:data2',VendamesController.index);

routes.get('/Estoquetotal/:for_cod',EstoquetotalController.index);

routes.get('/erp_usuarios/:usu_login/:usu_senha',UsuariosController.index);

routes.get('/vendeestgeral/:dataini/:datafim/:codigofab',VendestgeralController.listAllProducts);

routes.get('/vendeestgeralteste/:dataini/:datafim/:codigofab',VendestgeraltesteController.listAllProducts);

routes.get('/vendeestgeralacumloja/:dataini/:datafim/:codigofab',Aculoja.listAllProducts);

routes.get('/vendeestgeralitem/:dataini/:datafim/:codigofab',VendestgeralitemController.listAllProducts);

routes.get('/vendeestgeralitemtam/:dataini/:datafim/:codigofab/:produtos_reffor',VendestgeralitemtamController.listAllProducts);

routes.get('/vendeestgeralitemloja/:dataini/:datafim/:codigofab/:produtos_reffor',VendestgeralitemlojaController.listAllProducts);

routes.get('/movlogdia',MovlogdiaController.listAllProducts);

routes.get('/ultimaatualizacao',ultimaatualizacao.listAllProducts);

routes.get('/movlogdiadf',MovlogdiadfController.listAllProducts);

routes.post('/insert/:codigo/:nome/:prinome/:comissao/:seguimento/:seguimentogestao/:revistaparalelo/:revista/:acrescimo/:vinculo/:cpfcnpj/:grupo/:ativo',InsertFor251Controller.createProduct);

routes.get('/selectvinculo/:vinculo/',SelectvinculoFor251Controller.listAllProducts);

routes.get('/selectcodigo/:codigo/',SelectcodigoFor251Controller.listAllProducts);

routes.get('/selectrevista/',SelectrevistaFor251Controller.listAllProducts);

routes.get('/vendeestgeralacumlojaloja/:dataini/:datafim/:codigofab/:lojanome',Aculojaloja.listAllProducts);

routes.get('/vendeestgeralacumlojalojaloja/:dataini/:datafim/:codigofab/:lojanome',Aculojalojaloja.listAllProducts);

routes.get('/vendeestgeralacumloja4/:dataini/:datafim/:codigofab/:lojanome/:produtos_reffor',Aculoja4.listAllProducts);

routes.get('/cpfcnpjvinculo/:forvin_cod',cpfcnpjvinculo.listAllProducts);

routes.get('/todositensporcodigoloja/:dataini/:datafim/:codigofab/',todositensporcodigoloja.listAllProducts);

routes.get('/usuarios/:usu_login/:usu_senha',usuarios.listAllProducts);

routes.get('/combocodigo/:for_cod',combocodigo.listAllProducts);

routes.get('/comboloja',comboloja.listAllProducts);

routes.get('/consultaconso/:dataini/:datafim/:codigofab',consultaconso.listAllProducts);

routes.get('/totitemdff/:dataini/:datafim/:codigofab',totitemdff.listAllProducts);

routes.get('/totitement/:dataini/:datafim/:codigofab',totitement.listAllProducts);

routes.get('/totitempe/:dataini/:datafim/:codigofab',totitempe.listAllProducts);

routes.get('/totitemtr/:dataini/:datafim/:codigofab',totitemtr.listAllProducts);

routes.get('/totitementdcdt/:dataini/:datafim/:codigofab',totitementdcdt.listAllProducts);

routes.get('/totitempedcdt/:dataini/:datafim/:codigofab',totitempedcdt.listAllProducts);

routes.get('/totitemdffdcdt/:dataini/:datafim/:codigofab',totitemdffdcdt.listAllProducts);

routes.get('/totitemtrdcdt/:dataini/:datafim/:codigofab',totitemtrdcdt.listAllProducts);

routes.get('/totitementcod/:dataini/:datafim/:codigofab',totitementcod.listAllProducts);

routes.get('/totitempecod/:dataini/:datafim/:codigofab',totitempecod.listAllProducts);

routes.get('/totitemdffcod/:dataini/:datafim/:codigofab',totitemdffcod.listAllProducts);

routes.get('/totitemtrcod/:dataini/:datafim/:codigofab',totitemtrcod.listAllProducts);

routes.get('/totitementdoc/:dataini/:datafim/:documento',totitementdoc.listAllProducts);

routes.get('/totitempedoc/:dataini/:datafim/:documento',totitempedoc.listAllProducts);

routes.get('/totitemdffdoc/:dataini/:datafim/:documento',totitemdffdoc.listAllProducts);

routes.get('/totitemtrdoc/:dataini/:datafim/:documento',totitemtrdoc.listAllProducts);

routes.get('/checkpro/:codigofab',checkpro.listAllProducts);

routes.post('/InsertRevFor251/:revistas_id/:revistas_nome/:revistas_lancamento/:revistas_ivendas/:revistas_prelanc',InsertRevFor251Controller.createProduct);

routes.get('/SelectRevFor251',SelectRevFor251Controller.listAllProducts);

routes.get('/SelectGrupFor251Controller',SelectGrupFor251Controller.listAllProducts);

routes.get('/SelectGrupVinFor251Controller',SelectGrupVinFor251Controller.listAllProducts);

routes.get('/consultadfmovimentacoes/:documento/:data', consultadfmovimentacoes.listAllProducts);

routes.get('/consultaentmovimentacoes/:documento/:data', consultaentmovimentacoes.listAllProducts);

routes.post('/insertdfmovimentacoes/:documento/:data/:hora/:vendedor/:tipo/:origem/:cancelado/:bloqueado/:itens/:alteracoes/:operador/:descontos/:total/', insertdfmovimentacoes.createProduct);

routes.post('insertentmovimetacoes/:documento/:data/:hora/:vendedor/:tipo/:origem/:cancelado/:bloqueado/:itens/:alteracoes/:operador/:descontos/:total/', insertentmovimentacoes.createProduct);

routes.post('insertdfitensmovimentacoes/::documento/:data/:hora/:vendedor/:tipo/:origem/:cancelado/:bloqueado/:itens/:alteracoes/:operador/:descontos/:total/', insertdfitensmovimentacoes.createProduct);

routes.post('insertentitensmovimentacoes/:documento/:data/:hora/:vendedor/:tipo/:origem/:cancelado/:bloqueado/:itens/:alteracoes/:operador/:descontos/:total/', insertentitensmovimentacoes.createProduct);


module.exports = routes;
